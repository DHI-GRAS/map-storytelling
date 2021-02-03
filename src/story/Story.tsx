import React, {
	FC, useState, useContext, useEffect,
} from 'react'
import { Box, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Scrollama, Step } from 'react-scrollama'
import configFile from 'common/data/config'
import { AppContext } from 'app-screen/AppScreen'
import { FlyToInterpolator } from 'react-map-gl'
import { easeCubicInOut } from 'd3-ease'
import { forestArea } from 'common/data/forestAreaData'
import { forestPerInhabitant } from 'common/data/forestPerInhabitant'
import generateMarkerLayer from 'common/layers/generateMarkerLayer'
import generateRasterLayer from 'common/layers/generateRasterLayer'
import generateGeoJsonLayer from 'common/layers/generateGeoJsonLayer'
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
}))

type dataType = {
	step: number,
	data: any,
}

type StepIndex = number | null

interface Story {
	stepIndex?: StepIndex,
}

const Story: FC<Story> = ({ stepIndex }) => {

	const classes = useStyles()

	const {
		actions: { setViewport, setLayers },
	} = useContext(AppContext)

	const [ currentStepIndex, setCurrentStepIndex ] = useState<StepIndex>(stepIndex ?? 0)
	const [ showDetails, setShowDetails ] = useState(false)

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
					// if the layer is new aka it's not found, get the data. Propbably using only item.data is enough but don't wanna brake things.
					const foundData = (layersCopy[ isFound ]?.props.data || item.data) ?? undefined
					// generate new layer and add it to the temporary array
					const newLayer = generateMarkerLayer(item.id, foundData, item.visible)
					layersCopy = [ ...layersCopy, newLayer ]

				}
				return;
			}


				if (item.type === 'raster') {
					if(item.animation === true){
						// if item has animation we start a counter
						let counter = 0
						// get how many raster we have to switch between
						let rasterCount = item.rasters.length
						// start the interval assingning it to the global value
						rasterAnim = setInterval(() => {
							// build the new raster layer
							const newLayer = generateRasterLayer(item.rasters[counter].id, item.rasters[counter].url, true)
							setLayers((l => {
								// check if the counter has reached the limit
								if(counter === rasterCount - 1){
									// if so, reset the counter and reset the array from the state
									counter = -1
									return [...layersCopy, newLayer]
								}
								// otherwise just add to the state
								return [...l, newLayer]
							}))
							// update the counter
							counter += 1
						}, 6000)

						// situation where raster is not an animation so we just add it to the state
					} else {
						// if is not to be visible then filter the array
						if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)
						else if (isFound === -1) {
							// if the raster is not found add it to the state
							const newLayer = generateRasterLayer(item.id, item.url, item.visible)
							layersCopy = [ ...layersCopy, newLayer ]

						}
						return;
					}
					// if geojson then create new geojson layer
						if (item.type === 'geojson') {
							if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)
							else if (isFound === -1) {

							const foundData = item.data
							const newLayer = generateGeoJsonLayer(item.id, foundData, item.visible, undefined, item.fill, item.fillColor)
							layersCopy = [ ...layersCopy, newLayer ]

							}
							return;
						}
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

		const onExit = data.data.onChapterExit
		if (onExit.length > 0) setLayers((lrs: any) => {

			// use a copy of the layers found in the state
			let layersCopy = [ ...lrs ]
			onExit.forEach((item: any) => {

				const isFound = layersCopy.findIndex((stateLayer: any) => item.id === stateLayer.id)
				if (item.type === 'marker') {
					if (item.visible === false) {

						layersCopy = layersCopy.filter(layer => layer.id !== item.id)

					} else if (isFound === -1) {

						const foundData = (layersCopy[ isFound ]?.props.data || item.data) ?? undefined

						const newLayer = generateMarkerLayer(item.id, foundData, item.visible)
						layersCopy = [ ...layersCopy, newLayer ]

					}
					return;
				}

				if (item.type === 'raster') {
					if(item.animation === true){

						// remove the layers and clear the interval
						layersCopy = layersCopy.filter(lrsPass => !(lrsPass.id.includes(item.id)))
						setLayers([...layersCopy])
						clearInterval(rasterAnim)

					}else{

						if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)

						else if (isFound === -1) {

						const newLayer = generateRasterLayer(item.id, item.url, item.visible)
						layersCopy = [ ...layersCopy, newLayer ]

						}
					}
					return;
				}

				if (item.type === 'geojson') {
					if (item.visible === false) layersCopy = layersCopy.filter(layer => layer.id !== item.id)
					else if (isFound === -1) {

					const foundData = item.data
					const newLayer = generateGeoJsonLayer(item.id, foundData, item.visible, undefined, item.fill, item.fillColor)
					layersCopy = [ ...layersCopy, newLayer ]

					}
					return;
				}
			})

			return [ ...layersCopy ]

		})


	}

	useEffect(() => {

		if (currentStepIndex === 1) setShowDetails(true)
		else setShowDetails(false)

	}, [ currentStepIndex ])

	return (
		<Box className={classes.storiesWrapper}>
			<Scrollama
				onStepEnter={onStepEnter}
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
								flexDirection: item.id === 'forest-national-scale-layer' ? "column" : "row"
							}}
						>
							<Paper className={classes.stepBoxItem}>
								<Typography variant={'h3'} gutterBottom>
									{item.title}
								</Typography>
								<Typography variant={'body1'} gutterBottom>
									{item.description}
								</Typography>
							</Paper>
							{showDetails && (
								<Box display="flex" flexDirection="column">
									{item.id === 'forest-national-scale-layer' && (
										<Paper className={classes.stepBoxItem} style={{  maxWidth: 'unset', marginTop: "1rem" }}>
											<StatisticsCounter title={'Top 5 - Most forest area (km2)'} items={forestArea} />
										</Paper>
									)}
									{item.id === 'forest-national-scale-layer' && (
										<Paper className={classes.stepBoxItem} style={{  maxWidth: 'unset', marginTop: "1rem" }}>
											<StatisticsCounter title={'m2 forest/inh. - top 5 biggest mun.'} items={forestPerInhabitant} />
										</Paper>
									)}
								</Box>
							)}
						</Box>
					</Step>
				))
			}
			</Scrollama>
		</Box>
	)

}

export default Story
