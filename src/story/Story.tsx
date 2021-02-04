import React, {
	FC, useState, useContext, useEffect, CSSProperties,
} from 'react'
import {
	Box, Typography, Paper, Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Scrollama, Step } from 'react-scrollama'
import configFile from 'common/data/config'
import { AppContext } from 'app-screen/AppScreen'
import { FlyToInterpolator } from 'react-map-gl'
import { easeCubicInOut } from 'd3-ease'
import { forestArea } from 'common/data/forestAreaData'
import { herningData } from 'common/data/herningData'
import { forestPerInhabitant } from 'common/data/forestPerInhabitant'
import generateMarkerLayer from 'common/layers/generateMarkerLayer'
import generateRasterLayer from 'common/layers/generateRasterLayer'
import generateGeoJsonLayer from 'common/layers/generateGeoJsonLayer'
import generateClorLayer from 'common/layers/generateClorLayer'
import StatisticsCounter from './StatisticsCounter'

const useStyles = makeStyles(() => ({
	storiesWrapper: {
		position: 'absolute',
		overflow: 'auto',
		margin: '0',
		// border: '2px dashed skyblue',
		width: '100vw',
		zIndex: 1000,
	},
	stepBox: {
		height: '100vh',
		margin: 0,
		display: 'flex',
		alignItems: 'center',
		padding: '2rem',
		transition: 'all .3s ease-in',
	},
	stepBoxItem: {
		padding: '2rem',
		maxWidth: '40%',
	},
	journeyButton: {
		backgroundColor: '#188D01',
		'&:hover': {
			backgroundColor: '#199600',
		},
	},
}))

type dataType = {
	step: number,
	data: any,
}

type StepIndex = number | null

interface StoryProps {
	stepIndex?: StepIndex,
}

const bannerVideo: CSSProperties = {
	// position: 'absolute',
	// top: ' 50%',
	// left: '50%',
	width: '35%',
	height: 'auto',
	// minHeight: ' 100%',
	// transform: 'translateX(-50%) translateY(-50%)',
	zIndex: -1,
}

const Story: FC<StoryProps> = ({ stepIndex }) => {

	const classes = useStyles()

	const {
		state: { isJourneyMode },
		actions: { setViewport, setLayers, onSetStoryMode },
	} = useContext(AppContext)

	const [ currentStepIndex, setCurrentStepIndex ] = useState<StepIndex>(stepIndex ?? 0)
	const [ isExecExit, setIsExecExit ] = useState(false)
	const cloropathLayers = [ 'communes-cloropeth-layer-opacity', 'communes-cloropeth-layer' ]
	// holder of the interval if we have an animation situation
	let rasterAnim: NodeJS.Timeout

	const onStepEnter = ({ data }: {data: dataType}) => {

		const onEnter = data.data.onChapterEnter
		// using the layers state from context will always return the default state value.
		if (onEnter.length > 0) setLayers((ls: any[]) => {

			let layersCopy = [ ...ls ]

			// for each layer that needs to be added
			onEnter.forEach((item: any) => {


				// we check if the layer is found in the state
				const isFound = layersCopy.findIndex(stateLayer => item.id === stateLayer.id)
				// check the layer type
				if (item.type === 'marker') {

					// if we want to make the item invisible, we remove it from the state array
					if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)
					else if (isFound === -1) {

						// if the layer is new aka it's not found, get the data.
						// Propbably using only item.data is enough but don't wanna brake things.
						const foundData = (layersCopy[ isFound ]?.props.data || item.data) ?? undefined
						// generate new layer and add it to the temporary array
						const newLayer = generateMarkerLayer(item.id, foundData, item.visible)
						layersCopy = [ ...layersCopy, newLayer ]

					}

					return

				}


				if (item.type === 'raster') if (item.animation === true) {

					// setIsButtonDisabled(true)
					// if item has animation we start a counter
					let counter = 0
					// get how many raster we have to switch between
					const rasterCount = item.rasters.length
					// start the interval assingning it to the global value
					rasterAnim = setInterval(() => {

						// build the new raster layer
						const newLayer = generateRasterLayer(item.rasters[ counter ].id, item.rasters[ counter ].url, true, item.opacity)
						setLayers((l: any) => [ ...l, newLayer ])
						// update the counter
						if (counter === rasterCount - 1) clearInterval(rasterAnim)


						counter += 1

					}, 6000)

					// situation where raster is not an animation so we just add it to the state

				} else {

					// if is not to be visible then filter the array
					if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)
					else if (isFound === -1) {

						const newLayer = generateRasterLayer(item.id, item.url, item.visible, item.opacity)
						layersCopy = [ ...layersCopy, newLayer ]

					}

					// if the raster is not found add it to the state


					return

				}


				// if geojson then create new geojson layer
				if (item.type === 'geojson') if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)
				else if (isFound === -1) if (cloropathLayers.includes(item.id)) {

					const newLayer = generateClorLayer(item.id, item.visible, item.data, item.opacity, item.extruded)
					layersCopy = [ ...layersCopy, newLayer ]

				} else {

					const foundData = item.data
					const newLayer = generateGeoJsonLayer(item.id, foundData, item.visible, item.lineColor, item.fill, item.fillColor)
					layersCopy = [ ...layersCopy, newLayer ]

				}


			})

			// at the end return the modified array to the state
			return [ ...layersCopy ]

		})

		// get center
		const dataCenter = data.data.location.center
		const { center, ...rest } = data.data.location

		setCurrentStepIndex(data.step)
		// update the viewport
		setViewport({
			longitude: dataCenter[ 0 ],
			latitude: dataCenter[ 1 ],
			transitionDuration: 4000,
			transitionInterpolator: new FlyToInterpolator(),
			transitionEasing: easeCubicInOut,
			...rest,
		})

	}

	// onStepExit is the same function as onStepEnter
	const onStepExit = ({ data }: {data: dataType}) => {

		setIsExecExit(true)
		const onExit = data.data.onChapterExit
		if (onExit.length > 0) setLayers((lrs: any) => {

			// use a copy of the layers found in the state
			let layersCopy = [ ...lrs ]
			onExit.forEach((item: any) => {

				const isFound = layersCopy.findIndex((stateLayer: any) => item.id === stateLayer.id)
				if (item.type === 'marker') {

					if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)

					else if (isFound === -1) {

						const foundData = (layersCopy[ isFound ]?.props.data || item.data) ?? undefined

						const newLayer = generateMarkerLayer(item.id, foundData, item.visible)
						layersCopy = [ ...layersCopy, newLayer ]

					}

					return

				}

				if (item.type === 'raster') {

					if (item.animation === true) {

						// remove the layers and clear the interval
						layersCopy = layersCopy.filter(lrsPass => !lrsPass.id.includes(item.id))
						setLayers([ ...layersCopy ])
						clearInterval(rasterAnim)

					} else

					if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)

					else if (isFound === -1) {

						const newLayer = generateRasterLayer(item.id, item.url, item.visible, item.opacity)
						layersCopy = [ ...layersCopy, newLayer ]

					}

					return

				}

				if (item.type === 'geojson') if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)
				else if (isFound === -1) if (cloropathLayers.includes(item.id)) {

					const newLayer = generateClorLayer(item.id, item.visible, item.data, item.opacity, item.extruded)
					layersCopy = [ ...layersCopy, newLayer ]

				} else {

					const foundData = item.data
					const newLayer = generateGeoJsonLayer(item.id, foundData, item.visible, item.lineColor, item.fill, item.fillColor)
					layersCopy = [ ...layersCopy, newLayer ]

				}


			})

			return [ ...layersCopy ]

		})
		setIsExecExit(false)

	}

	useEffect(() => {

		// console.log(isExecExit)

	}, [ isExecExit ])

	return (
		<>
			<Box position={'fixed'} style={{ top: '1rem', right: '1rem', zIndex: 10000 }}>
				<Button
					disabled={currentStepIndex === 4}
					variant={'contained'}
					onClick={() => onSetStoryMode(isJourneyMode)}
					className={classes.journeyButton}
				>
					{!isJourneyMode ? 'Udforsk det grønne Danmark' : 'Afslut'}
				</Button>
			</Box>
			{isJourneyMode && (
			<Box className={classes.storiesWrapper}>
				<Scrollama
					onStepEnter={data => !isExecExit && onStepEnter(data)}
					onStepExit={onStepExit}
					debug={undefined}
				>
					{
				configFile.chapters.map((item, i) => (
					<Step
						data={{
							step: i,
							data: item,
						}}
						key={`step-${i}`}
					>
						<Box
							className={classes.stepBox}
							style={{
								opacity: currentStepIndex === i ? 1 : 0.2,
								justifyContent: item.alignmentX,
								alignItems: item.alignmentY,
								flexDirection: item.id === 'forest-national-scale-layer' || item.id === 'herning-commune' ? 'column' : 'row',
							}}
						>
							{item.id === 'denmark-layer' ? (
								<Box>
									<Typography variant={'h1'} style={{ color: '#FFFFFF' }}>
										{item.title}
									</Typography>
									<Typography variant={'h2'} style={{ color: '#FFFFFF' }}>
										{item.description}
									</Typography>
									{currentStepIndex === 0 && (
									<Box mt={2} width={1}>
										<video autoPlay loop muted style={bannerVideo}>
											<source
												src={'https://grasdatastorage.blob.core.windows.net/images/story_landing_video.mp4'}
												type={'video/mp4'}
											/>
										</video>
									</Box>
									)
									}

								</Box>
							) : (
								<>
									<Paper className={classes.stepBoxItem}>
										<Typography variant={'h3'} gutterBottom>
											{item.title}
										</Typography>
										{item.description && (
											<Typography variant={'body1'} gutterBottom>
												{item.description}
											</Typography>
										)}

									</Paper>
									{currentStepIndex === 1 && (
										<Box display={'flex'} flexDirection={'column'}>
											{item.id === 'forest-national-scale-layer' && (
											<Paper className={classes.stepBoxItem} style={{ maxWidth: 'unset', marginTop: '1rem', padding: 1 }}>
												<StatisticsCounter title={'Top 5 - Most forest area (km2)'} items={forestArea} />
											</Paper>
											)}
											{item.id === 'forest-national-scale-layer' && (
											<Paper className={classes.stepBoxItem} style={{ maxWidth: 'unset', marginTop: '1rem', padding: 1 }}>
												<StatisticsCounter title={'m2 forest/inh. - top 5 biggest mun.'} items={forestPerInhabitant} />
											</Paper>
											)}
										</Box>
									)}
									{currentStepIndex === 3 && (
										<Box display={'flex'} flexDirection={'column'}>
											<Paper className={classes.stepBoxItem} style={{ maxWidth: 'unset', marginTop: '1rem', padding: 1 }}>
												<StatisticsCounter title={'km2'} items={herningData} />
											</Paper>
										</Box>
									)}
								</>
							)}
						</Box>
					</Step>
				))
			}
				</Scrollama>
			</Box>
			)}
		</>
	)

}

export default Story
