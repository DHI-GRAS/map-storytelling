import React, {
	FC, useContext, CSSProperties, useRef, MutableRefObject,
} from 'react'
import {
	Box, Typography, Paper, Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import configFile from 'config/config'
import { AppContext } from 'app-screen/AppScreen'
import { FlyToInterpolator } from 'react-map-gl'
import { easeCubicInOut } from 'd3-ease'
import { forestArea } from 'common/data/forestAreaData'
import { doubleData } from 'common/data/dubleData'
import { herningData } from 'common/data/herningData'
import { forestPerInhabitant } from 'common/data/forestPerInhabitant'
import generateMarkerLayer from 'common/layers/generateMarkerLayer'
import generateRasterLayer from 'common/layers/generateRasterLayer'
import generateGeoJsonLayer from 'common/layers/generateGeoJsonLayer'
import generateClorLayer from 'common/layers/generateClorLayer'
import Scroll from 'scroll/Scroll'
import { Chapter } from 'config/@types/Config'
import LayerTypes from 'common/layers/@types/LayerTypes'
import StatisticsCounter from './StatisticsCounter'
import StatisticsCounterDouble from './StatisticsCounterDouble'

const useStyles = makeStyles(() => ({
	storiesWrapper: {
		position: 'absolute',
		overflow: 'auto',
		margin: '0',
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
		marginTop: '1rem',
		backgroundColor: '#188D01',
		'&:hover': {
			backgroundColor: '#199600',
		},
		'&:disabled': {
			backgroundColor: '#B7F9A2',
		},
	},
}))

type StepIndex = number | null

interface StoryProps {
	stepIndex?: StepIndex,
}

const bannerVideo: CSSProperties = {
	width: '40%',
	height: 'auto',
	zIndex: -1,
}

const Story: FC<StoryProps> = () => {

	const classes = useStyles()

	const {
		state: {
			isJourneyMode,
			layers,
			activeStep,
		},
		actions: {
			setViewport,
			setLayers,
			onSetStoryMode,
			onEnableMap,
			setActiveStep,
		},
	} = useContext(AppContext)

	// const [ currentStepIndex, setCurrentStepIndex ] = useState<StepIndex>(null)
	const cloropathLayers = [ 'communes-cloropeth-layer-opacity', 'communes-cloropeth-layer' ]

	// holder of the interval if we have an animation situation
	const rasterAnim: MutableRefObject<number | undefined> = useRef(undefined)
	const markerAnim: MutableRefObject<number | undefined> = useRef(undefined)

	const handleChangeStep = async(step: number, dataAfter: Chapter, dataBefore: Chapter | undefined) => {

		setActiveStep(step)

		let layersCopy = [ ...layers ]
		// tryied adding these two parts as separate functions but it didn't seme to work well
		dataBefore && dataBefore.onChapterExit.length > 0 && dataBefore.onChapterExit.forEach((item: any) => {

			const isFound = layersCopy.findIndex((stateLayer: any) => item.id === stateLayer.id)
			if (item.type === 'marker') {

				if (item.animation === true) {

					clearInterval(markerAnim.current)
					layersCopy = layersCopy.filter(lrsPass => !lrsPass.id.includes(item.id))
					setLayers([ ...layersCopy ])

				} else
				if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)

				else if (isFound === -1) {

					// const foundData = (layersCopy[ isFound ]?.props.data || item.data) ?? undefined

					const newLayer = generateMarkerLayer(item.id, item.data, item.visible)
					layersCopy = [ ...layersCopy, newLayer ]

				}

				return

			}

			if (item.type === 'raster') {

				if (item.animation === true) {

					// remove the layers and clear the interval
					layersCopy = layersCopy.filter(lrsPass => !lrsPass.id.includes(item.id))
					setLayers([ ...layersCopy ])
					clearInterval(rasterAnim.current)

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

		dataAfter.onChapterEnter.length > 0 && dataAfter.onChapterEnter.forEach((item: any) => {

			const isFound = layersCopy.findIndex(stateLayer => item.id === stateLayer.id)
			if (item.type === 'marker') {

				// if we want to make the item invisible, we remove it from the state array
				if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)
				else if (isFound === -1) if (item.animation === true) {

					let counter = 0
					// get how many raster we have to switch between
					const markerCount = item.data.length
					// start the interval assingning it to the global value
					markerAnim.current = setInterval(() => {

						const currentMark = item.data[ counter ]
						// build the new raster layer
						const newLayer = generateMarkerLayer(currentMark.id, [ currentMark ], true)
						setLayers((l: any) => [ ...l.filter((lyr: LayerTypes) => lyr.id !== currentMark.id), newLayer ])
						// update the counter
						if (counter === markerCount - 1 && markerAnim.current) clearInterval(markerAnim.current)

						counter += 1

					}, 2000)

				} else {

					// if the layer is new aka it's not found, get the data.
					// Propbably using only item.data is enough but don't wanna brake things.
					const foundData = (layersCopy[ isFound ]?.props.data || item.data) ?? undefined
					// generate new layer and add it to the temporary array
					const newLayer = generateMarkerLayer(item.id, foundData, item.visible)
					layersCopy = [ ...layersCopy, newLayer ]

				}

				return

			}


			if (item.type === 'raster') {

				if (item.animation === true) {

					// setIsButtonDisabled(true)
					// if item has animation we start a counter
					let counter = 0
					// get how many raster we have to switch between
					const rasterCount = item.rasters.length
					// start the interval assingning it to the global value
					rasterAnim.current = setInterval(() => {

						// build the new raster layer
						const newLayer = generateRasterLayer(item.rasters[ counter ].id, item.rasters[ counter ].url, true, item.opacity)
						setLayers((l: any) => [ ...l, newLayer ])
						// update the counter
						if (counter === rasterCount - 1) clearInterval(rasterAnim.current)


						counter += 1

					}, 6000)

					// situation where raster is not an animation so we just add it to the state

				} else

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

		setLayers([ ...layersCopy ])
		// get center
		const dataCenter = dataAfter.location.center
		const { center, ...rest } = dataAfter.location


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

	const onJourneyModeEdit = () => {

		clearInterval(rasterAnim.current)
		clearInterval(markerAnim.current)
		onSetStoryMode(isJourneyMode)
		if (isJourneyMode) setActiveStep(null)

	}

	return (
		<>
			<Box display={'flex'} flexDirection={'column'} position={'fixed'} style={{ top: '1rem', right: '2rem', zIndex: 10000 }}>
				{activeStep !== null && (
					<Button
						disabled={[ 12 ].includes(activeStep)}
						variant={'contained'}
						onClick={() => onEnableMap(isJourneyMode)}
						className={classes.journeyButton}
					>
						{isJourneyMode ? 'Explore' : 'Continue story'}
					</Button>
				)}

				<Button
					variant={'contained'}
					onClick={onJourneyModeEdit}
					className={classes.journeyButton}
				>
					{!isJourneyMode ? 'Udforsk det grønne Danmark' : 'Afslut'}
				</Button>
			</Box>
			{isJourneyMode && (
			<Box>
				<Scroll
					data={configFile.chapters}
					activeStep={activeStep ?? 0}
					onChangeStep={handleChangeStep}
					// debug
					topOffset={300}
				>
					{
						configFile.chapters.map((item, i) => (
							<Box key={`step-${i}`}>
								<Box
									className={classes.stepBox}
									style={{
										opacity: activeStep === i ? 1 : 0.2,
										justifyContent: item.alignmentX,
										alignItems: item.alignmentY,
										flexDirection: item.id === 'forest-national-scale-layer' ||
										item.id === 'herning-commune' ||
										item.id === 'raster-forest-class' ? 'column' : 'row',
									}}
								>
									{item.title && i !== 0 && activeStep !== 0 && (
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
									)}
									{
										activeStep === 0 && i === 0 && (
											<Box display={'flex'} flexDirection={'column'}>
												<Box mb={2}>

													<Typography variant={'h1'} style={{ color: '#FFFFFF' }}>
														{'Det Grønne Danmarkskort'}
													</Typography>
													<Typography variant={'h2'} style={{ color: '#FFFFFF' }}>
														<i>
															{'Genvejen til et opdateret og tidsligt overblik over det Grønne Danmark'}
														</i>
													</Typography>
												</Box>
												<video autoPlay loop muted style={bannerVideo}>
													<source
														src={'https://grasdatastorage.blob.core.windows.net/images/story_landing_video.mp4'}
														type={'video/mp4'}
													/>
												</video>
											</Box>
										)
											}
									{activeStep === 1 && i === 1 && (
									<Box display={'flex'} flexDirection={'column'}>
										{item.id === 'forest-national-scale-layer' && (
										<Paper className={classes.stepBoxItem} style={{ maxWidth: 'unset', marginTop: '1rem', padding: 1 }}>
											<StatisticsCounter title={'Top 5 - Mest skovdække (km2)'} items={forestArea} />
										</Paper>
										)}
										{item.id === 'forest-national-scale-layer' && (
										<Paper className={classes.stepBoxItem} style={{ maxWidth: 'unset', marginTop: '1rem', padding: 1 }}>
											<StatisticsCounter title={'m2 skov/indbygger'} items={forestPerInhabitant} />
										</Paper>
										)}

									</Box>
									)}
									{activeStep === 3 && i === 3 && (
									<Box display={'flex'} flexDirection={'column'}>
										<Paper className={classes.stepBoxItem} style={{ maxWidth: 'unset', marginTop: '1rem', padding: 1 }}>
											<StatisticsCounter title={'km2'} items={herningData} />
										</Paper>
									</Box>
									)}
									{activeStep === 11 && i === 11 && (
									<Box display={'flex'} flexDirection={'column'}>
										<Paper className={classes.stepBoxItem} style={{ maxWidth: 'unset', marginTop: '1rem', padding: 1 }}>
											<StatisticsCounterDouble title={'2019 - 2020'} items={doubleData} />
										</Paper>
									</Box>
									)}
								</Box>
							</Box>
						))
					}
				</Scroll>
			</Box>
			)}
		</>
	)

}

export default Story
