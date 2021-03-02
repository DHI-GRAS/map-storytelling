/* eslint-disable complexity */
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
import { forestPerInhabitant } from 'common/data/forestPerInhabitant'
import generateMarkerLayer from 'common/layers/generateMarkerLayer'
import generateRasterLayer from 'common/layers/generateRasterLayer'
import generateGeoJsonLayer from 'common/layers/generateGeoJsonLayer'
import generateClorLayer from 'common/layers/generateClorLayer'
import generateTextMarkerLayer from 'common/layers/generateTextMarkerLayer'
import Scroll from 'scroll/Scroll'
import { Chapter } from 'config/@types/Config'
import LayerTypes from 'common/layers/@types/LayerTypes'
import videoPoster from 'common/images/loading_video.jpg'
// eslint-disable-next-line import/extensions
import videoFile from 'common/images/story-landing-video-1.mp4'
import legendForest2Class from 'common/data/legendForest2Class'
import legendForest6Class from 'common/data/legendForest6Class'
import Info from 'info/Info'
import aarhusData from 'common/data/aarhusData'
import StatisticsCounter from './StatisticsCounter'
import StatisticsCounterDouble from './StatisticsCounterDouble'
import Legend from './Legend'
import {
	textOnLandingInfo,
	textSlide1Info,
	textSlide2Info,
	textSlide3Info,
	textSlide4Info,
	textSlide5Info,
	textSlide7Info,
} from './infoText'
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
	colorBox: {
		width: 16,
		height: 16,
	},
	legendText: {
		fontSize: '12px',
	},
}))

type StepIndex = number | null

interface StoryProps {
	stepIndex?: StepIndex,
}

const bannerVideo: CSSProperties = {
	minWidth: 150,
	marginTop: '1rem',
	width: '30%',
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
				activeStep === 4 && (
					<Box position={'fixed'} style={{ left: '1rem', bottom: '4rem' }}>
						<Legend items={legendForest2Class} />
					</Box>
				)
			}

			{
				activeStep === 5 && (
					<Box position={'fixed'} style={{ left: '1rem', bottom: '4rem' }}>
						<Legend items={legendForest6Class} />
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
										justifyContent: item.alignmentX,
										alignItems: item.alignmentY,
										flexDirection: [ 1, 4, 5, 7 ].includes(i) ? 'column' : 'row',
									}}
								>
									{item.title &&
									activeStep !== null &&
									![ 0, 1, 3, 7 ].includes(i) &&
									![ 0, 1, 3, 7 ].includes(activeStep) && (
									<Box display={'flex'} maxWidth={'40%'}>
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
										{activeStep === 2 && i === 2 && (
											<Info
												text={textSlide2Info}
												popoverStyle={{ marginLeft: '1rem' }}
											/>
										)}

										{activeStep === 3 && i === 3 && (
											<Info
												text={textSlide3Info}
												popoverStyle={{ marginLeft: '1rem' }}
											/>
										)}

										{activeStep === 4 && i === 4 && (
											<Info
												text={textSlide4Info}
												popoverStyle={{ marginLeft: '1rem' }}
											/>
										)}

										{activeStep === 5 && i === 5 && (
											<Info
												text={textSlide5Info}
												popoverStyle={{ marginLeft: '1rem' }}
											/>
										)}
									</Box>
									)}
									{
										activeStep === 0 && i === 0 && (
											<Box display={'flex'} flexDirection={'column'}>
												<Box width={'50vw'} mb={1}>
													<Typography variant={'h1'} style={{ color: '#FFFFFF' }}>
														{'The green map of Denmark'}
													</Typography>
													<Typography variant={'h2'} style={{ color: '#FFFFFF' }}>
														<i>
															{'The gateway to an up to date and timely overview of the green Denmark'}
														</i>
													</Typography>
												</Box>
												<video autoPlay loop muted style={bannerVideo} poster={videoPoster}>
													<source
														src={videoFile}
														type={'video/mp4'}
													/>
												</video>
											</Box>
										)
									}
									{activeStep === 1 && i === 1 && (
										<Box display={'flex'}>
											<Paper className={classes.stepBoxItem}>
												<Typography variant={'h3'} gutterBottom>
													{item.title}
												</Typography>
												{item.description && (
												<Typography variant={'body1'} gutterBottom>
													{item.description}
												</Typography>
												)}
												<Box style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} p={0.5} width={1} mt={2}>
													<StatisticsCounter title={'Most forest cover (km2)'} items={forestArea} heightScale={6} />
												</Box>
												<Box style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} p={0.5} width={1} mt={2}>
													<StatisticsCounter title={'m2 forest/inhabitant'} items={forestPerInhabitant} heightScale={6} />
												</Box>
											</Paper>
											<Info
												text={textSlide1Info}
												popoverStyle={{ marginLeft: '1rem' }}
											/>
										</Box>
									)}

									{activeStep === 3 && i === 3 && (
									<Box display={'flex'}>
										<Paper className={classes.stepBoxItem} style={{
											display: 'flex', alignItems: 'center', flexDirection: 'column',
										}}
										>
											<Box display={'flex'}>
												<Typography variant={'h3'} gutterBottom style={{ maxWidth: 120 }}>
													{item.title}
												</Typography>
											</Box>
											{item.description && (
											<Typography variant={'body1'} gutterBottom>
												{item.description}
											</Typography>
											)}
											<Box style={{ backgroundColor: 'rgba(255,255,255,0.3)', maxWidth: 100 }} p={0.5} mt={2}>
												<StatisticsCounter title={'km2'} items={aarhusData} heightScale={1} />
											</Box>
										</Paper>
										<Info
											text={textSlide3Info}
											popoverStyle={{ marginLeft: '1rem' }}
										/>
									</Box>
									)}

									{activeStep === 7 && i === 7 && (
									<Box display={'flex'}>
										<Paper className={classes.stepBoxItem} style={{ minWidth: 450 }}>
											<Box style={{ maxWidth: 400 }}>
												<Typography variant={'h3'} gutterBottom>
													{item.title}
												</Typography>
												{item.description && (
												<Typography variant={'body1'} gutterBottom>
													{item.description}
												</Typography>
												)}
												<Typography variant={'body2'}>
													<i>
														{'(In this example, we have quantified all green features in 2019 and 2020, in a 1 km2 area of interest in Gedser, Denmark)'}
													</i>
												</Typography>
											</Box>
											<Box style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} p={0.5} width={1} mt={2}>
												<StatisticsCounterDouble title={'2019 - 2020'} items={doubleData} heightScale={3} />
											</Box>
											<Box mt={1} display={'flex'}>
												<Box mx={1} display={'flex'}>
													<Box className={classes.colorBox} style={{ backgroundColor: '#FF8A00' }} />
													<Box ml={0.5}>
														<Typography variant={'body1'} className={classes.legendText}>
															{'2019'}
														</Typography>
													</Box>
												</Box>
												<Box mx={1} display={'flex'}>
													<Box className={classes.colorBox} style={{ backgroundColor: '#00A4EC' }} />
													<Box ml={0.5}>
														<Typography variant={'body1'} className={classes.legendText}>
															{'2020'}
														</Typography>
													</Box>
												</Box>
											</Box>
										</Paper>
										<Info
											text={textSlide7Info}
											popoverStyle={{ marginLeft: '1rem' }}
										/>
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
