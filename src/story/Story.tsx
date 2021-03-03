/* eslint-disable complexity */
import React, {
	FC, useContext, useRef, MutableRefObject, createElement,
} from 'react'
import {
	Box, Typography, Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import configFile from 'config/config'
import { AppContext } from 'app-screen/AppScreen'
import { FlyToInterpolator } from 'react-map-gl'
import { easeCubicInOut } from 'd3-ease'
import generateMarkerLayer from 'common/layers/generateMarkerLayer'
import generateRasterLayer from 'common/layers/generateRasterLayer'
import generateGeoJsonLayer from 'common/layers/generateGeoJsonLayer'
import generateClorLayer from 'common/layers/generateClorLayer'
import generateTextMarkerLayer from 'common/layers/generateTextMarkerLayer'
import Scroll from 'scroll/Scroll'
import { Chapter } from 'config/types/Config'
import LayerTypes from 'common/layers/@types/LayerTypes'
// eslint-disable-next-line import/extensions
import Info from 'info/Info'
import {
	textOnLandingInfo,
} from 'config/infoText'
import Legend from './Legend'
import ActionButtons from './ActionButtons'


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
		backgroundColor: 'rgba(255,255,255, .7)',
	},
}))

type StepIndex = number | null

interface StoryProps {
	stepIndex?: StepIndex,
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

	// IMPROVEMENT - merge both chapterEnter & chapterExit in the same function

	// const [ currentStepIndex, setCurrentStepIndex ] = useState<StepIndex>(null)
	const cloropathLayers = [ 'communes-cloropeth-layer-opacity', 'communes-cloropeth-layer' ]

	// holder of the interval if we have an animation situation
	const rasterAnim: MutableRefObject<any> = useRef(undefined)
	const markerAnim: MutableRefObject<any> = useRef(undefined)

	const chapterEnter = (data: Chapter, layersLocal: any) => {

		let layersCopy = [ ...layersLocal ]

		if (data.onChapterEnter.length > 0) data.onChapterEnter.forEach((item: any) => {

			const isFound = layersCopy.findIndex(stateLayer => item.id === stateLayer.id || stateLayer.id.includes(item.id))

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

			if (item.type === 'text-marker') if (item.visible === false) layersCopy = layersCopy.filter(layer => !layer.id.includes(item.id))
			else if (isFound === -1) if (item.animation === true) {

				let counter = 0
				// get how many raster we have to switch between
				const markerCount = item.data.length
				// start the interval assingning it to the global value
				markerAnim.current = setInterval(() => {

					const currentMark = item.data[ counter ]
					const layerName = `${String(item.id)}${counter}`
					const layerNamesOnMap = [ `${layerName}-0-textbox`, `${layerName}-0-marker` ]
					// build the new raster layer
					const newLayer = generateTextMarkerLayer(layerName, [ currentMark ])
					setLayers((l: any) => [ ...l.filter((lyr: LayerTypes) => !layerNamesOnMap.includes(lyr.id)), ...newLayer ])
					// update the counter
					if (counter === markerCount - 1 && markerAnim.current) clearInterval(markerAnim.current)

					counter += 1

				}, 2000)

			} else {

				// if the layer is new aka it's not found, get the data.
				// Propbably using only item.data is enough but don't wanna brake things.
				const foundData = item.data
				// generate new layer and add it to the temporary array
				const newLayers = generateTextMarkerLayer(item.id, foundData)
				layersCopy = [ ...layersCopy, ...newLayers ]

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
						if (item.rasters[ counter ].type === 'raster') {

							const newLayer = generateRasterLayer(
								item.rasters[ counter ].id,
								item.rasters[ counter ].url,
								true,
								item.rasters[ counter ].opacity,
							)
							setLayers((l: any) => [ ...l.filter((el: any) => !el.id.includes('layers-animation-vector')), newLayer ])

						} else if (item.rasters[ counter ].type === 'geojson') {

							const newLayers = item.rasters[ counter ].data
								.map((it: any) => generateGeoJsonLayer(it.id, it.data, it.visible, it.lineColor, it.fill, it.fillColor))
							setLayers((l: any) => [ ...l, ...newLayers ])

						}
						// update the counter
						if (counter === rasterCount - 1) clearInterval(rasterAnim.current)


						counter += 1

					}, 3000)

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

		return layersCopy

	}

	const chapterExit = (data: Chapter | undefined, layersLocal: any) => {

		let layersCopy = [ ...layersLocal ]
		if (data && data.onChapterExit.length > 0) data.onChapterExit.forEach((item: any) => {

			const isFound = layersCopy.findIndex((stateLayer: any) => item.id === stateLayer.id || item.id.includes(stateLayer.id))
			if (item.type === 'marker') {

				if (item.animation === true) {

					clearInterval(markerAnim.current)
					layersCopy = layersCopy.filter(lrsPass => !lrsPass.id.includes(item.id))
					// setLayers([ ...layersCopy ])

				} else if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)
				else if (isFound === -1) {

					// const foundData = (layersCopy[ isFound ]?.props.data || item.data) ?? undefined

					const newLayer = generateMarkerLayer(item.id, item.data, item.visible)
					layersCopy = [ ...layersCopy, newLayer ]

				}

				return

			}

			if (item.type === 'text-marker') {

				if (item.animation === true) {

					clearInterval(markerAnim.current)
					layersCopy = layersCopy.filter(lrsPass => !lrsPass.id.includes(item.id))
					// setLayers([ ...layersCopy ])

				} else if (item.visible === false) layersCopy = layersCopy.filter(lr => !lr.id.includes(item.id))


				return

			}

			if (item.type === 'raster') {

				if (item.animation === true) {

					// remove the layers and clear the interval
					layersCopy = layersCopy.filter(lrsPass => !lrsPass.id.includes(item.id))
					// setLayers([ ...layersCopy ])
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


		return layersCopy

	}

	const handleChangeStep = async(step: number, dataAfter: Chapter, dataBefore: Chapter | undefined) => {

		setActiveStep(step)

		const onExitLayersRemained = chapterExit(dataBefore, layers)
		const onEnterLayersRemained = chapterEnter(dataAfter, onExitLayersRemained)

		setLayers([ ...onEnterLayersRemained ])
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
			{!isJourneyMode && activeStep === null && (
				<Box width={'50vw'} position={'fixed'} style={{
					left: '4rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10000,
				}}
				>
					<Box display={'flex'} alignItems={'center'}>
						<Typography variant={'h1'} style={{ color: '#FFFFFF' }}>
							{'Welcome to the Green Map of Denmark'}
						</Typography>
						<Info
							text={textOnLandingInfo}
							popoverStyle={{ marginLeft: '1rem' }}
						/>
					</Box>
					<Typography variant={'h2'} style={{ color: '#FFFFFF' }}>
						<i>
							{'Begin your journey by clicking the green button'}
						</i>
					</Typography>
					</Box>
			)}
			<ActionButtons
				activeStep={activeStep}
				isJourneyMode={isJourneyMode}
				onEnableMap={(is: boolean) => onEnableMap(is)}
				onJourneyModeEdit={onJourneyModeEdit}
				storyButtonDisabled={[ 0, 8 ].includes(Number(activeStep))}
			/>
			{
				activeStep && configFile.chapters[ activeStep ].legend && (
					<Box position={'fixed'} style={{ left: '1rem', bottom: '4rem' }}>
						<Legend
							items={configFile.chapters[ activeStep ].legend?.items || []}
							title={configFile.chapters[ activeStep ].legend?.title}
							unit={configFile.chapters[ activeStep ].legend?.unit}
						/>
					</Box>
				)
			}

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
										justifyContent: item.content?.type === 'basic' ? item.content.alignmentX : '',
										alignItems: item.content?.type === 'basic' ? item.content.alignmentY : '',
									}}
								>
									{item.content?.type === 'basic' &&
									activeStep !== null &&
										(
											<Box display={'flex'} maxWidth={'40%'}>
												<Paper className={classes.stepBoxItem}>
													{item.content.title && (
														<Typography variant={'h3'} gutterBottom>
															{item.content.title}
														</Typography>
													)}
													{item.content.description && (
														<Typography variant={'body1'} gutterBottom>
															{item.content.description}
														</Typography>
													)}
												</Paper>
												{item.content.info && (
													<Info
														text={item.content.info}
														popoverStyle={{ marginLeft: '1rem' }}
													/>
												)}
											</Box>
										)}
									{
										item.content?.type === 'component' &&
										activeStep !== null &&
										item.content.component &&
											createElement(item.content.component)
									}
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
