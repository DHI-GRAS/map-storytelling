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
import StatisticsCounter from './StatisticsCounter'
import StatisticsCounterDouble from './StatisticsCounterDouble'
import Legend from './Legend'

const textOnLandingInfo = [
	'The Green map of Denmark was developed by DHI GRAS in 2021 to illustrate the potential, and opportunities, of earth observation (EO) technology to comprehensively map and monitor green features at scale. Learn how EO is used for frequent monitoring of national level forest cover, forest species mapping and see how it can be applied to map individual green objects in urban and rural landscapes',
	'Learn more at www.dhi-gras.com or reach out to us at gras@dhigroup.com',
]

const textSlide1Info = [
	'With up-to-date satellite imagery and novel AI technology, national level forest cover can be mapped quickly and efficiently and updated as often as needed (monthly/yearly).',
	'This data provides information to continuously assess carbon storage, report on national forest cover, extent assess and monitor the effect of national forest management programmes, and much more…',
]

const textSlide2Info = [
	'This choropleth map indicates the amount of forest (m2) per inhabitant per municipality in 2020.',
	'This information could for example be used to assess the effect of reforestation projects at municipal level, over time, to underpin efforts to maintain balance between population increase and access to green space.',
]

const textSlide3Info = [
	'As an example, Aarhus municipality has a strategic goal of increasing the forest cover by 3200 hectares before 2030. Approximately 200 hectares (2 km2) of forest needs to be raised each year to reach that target. With this tool, we can calculate how much forest is raised, month by month, until 2030 (and beyond). This way, everyone can follow the progress of efforts to make Denmark greener.',
]

const textSlide4Info = [
	'While it is important to know where the forest is, and how much there is, it is equally important to have information on the diversity of forest areas. This data illustrates the extent of coniferous and deciduous forest areas in 2020, providing important information used to underpin biodiversity conservation and habitat connectivity objectives.',
]

const textSlide5Info = [
	'Using AI and time-series of high resolution satellite imagery, it is even possible to classify the extent of forest areas by species.',
	'In this area, in Gribskov (Grib forest), the dominant species are Beech and Fir, followed by Oak and Birch. Small patches of Maple and Larch trees are also encountered. This information provides critical information to monitor environmental health, habitat connectivity and biodiversity status.',
]

const textSlide7Info = [
	'Using deep learning and very high resolution data, we can go into even greater details by mapping each individual green landscape feature. In this example, we have used a combination of LIDAR intensity data, a normalised elevation model (nDSM), GeoDK vector reference data and aerial imagery (10 cm resolution) to map and quantify the amount of green objects in Gedser, Denmark.',
]

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
								item.rasters[ counter ].id, item.rasters[ counter ].url, true, item.rasters[ counter ].opacity
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
			<Box display={'flex'} flexDirection={'column'} position={'fixed'} style={{ top: '1rem', right: '2rem', zIndex: 10000 }}>
				{activeStep !== null && (
					<Button
						disabled={[ 0, 8 ].includes(activeStep)}
						variant={'contained'}
						onClick={() => onEnableMap(isJourneyMode)}
						className={classes.journeyButton}
					>
						{isJourneyMode ? 'Explore data' : 'Continue story'}
					</Button>
				)}


				<Button
					variant={'contained'}
					onClick={onJourneyModeEdit}
					className={classes.journeyButton}
				>
					{!isJourneyMode && activeStep === null ? 'Explore the Green Map of Denmark' : 'End'}
				</Button>
			</Box>

			{
				activeStep === 4 && (
					<Box position={'fixed'} style={{ left: '1rem', bottom: '3rem' }}>
						<Legend items={legendForest2Class} />
					</Box>
				)
			}

			{
				activeStep === 5 && (
					<Box position={'fixed'} style={{ left: '1rem', bottom: '3rem' }}>
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
										flexDirection: [ 1, 3, 4, 5, 7 ].includes(i) ? 'column' : 'row',
									}}
								>
									{item.title && i !== 0 && activeStep !== 0 && (
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
										{activeStep === 1 && i === 1 && (
											<Info
												text={textSlide1Info}
												popoverStyle={{ marginLeft: '1rem' }}
											/>
										)}

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

										{activeStep === 7 && i === 7 && (
											<Info
												text={textSlide7Info}
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
										<Box display={'flex'} flexDirection={'column'}>
											{item.id === 'forest-national-scale-layer' && (
											<Paper className={classes.stepBoxItem} style={{ maxWidth: 'unset', marginTop: '1rem', padding: 1 }}>
												<StatisticsCounter title={'Most forest cover (km2)'} items={forestArea} heightScale={2} />
											</Paper>
											)}
											{item.id === 'forest-national-scale-layer' && (
											<Paper className={classes.stepBoxItem} style={{ maxWidth: 'unset', marginTop: '1rem', padding: 1 }}>
												<StatisticsCounter title={'m2 forest/inhabitant'} items={forestPerInhabitant} heightScale={2} />
											</Paper>
											)}
										</Box>
									)}


									{activeStep === 7 && i === 7 && (
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
