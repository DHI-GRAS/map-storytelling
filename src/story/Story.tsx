import React, { FC, useState, useContext, useEffect } from "react"
import { Box, Typography, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Scrollama, Step } from 'react-scrollama';
import configFile from "common/data/config"
import {AppContext} from "app-screen/AppScreen"
import { FlyToInterpolator } from 'react-map-gl';
import { IconLayer } from '@deck.gl/layers';
import { easeCubicInOut } from 'd3-ease'
import generateMarkerLayer from "common/layers/generateMarkerLayer"
import generateRasterLayer from "common/layers/generateRasterLayer"
// import StatisticsCounter from "./StatisticsCounter"

const useStyles = makeStyles(() => ({
	storiesWrapper: {
		position: "absolute",
		overflow: "auto",
		margin: '0',
		// border: '2px dashed skyblue',
		width: "100vw",
		zIndex: 1000
	},
	stepBox: {
		height: "100vh",
		margin: 0,
		display: "flex",
		alignItems: "center",
		padding: "2rem",
		transition: "all .3s ease-in"
	},
	stepBoxItem: {
		padding: "2rem",
		maxWidth: "40%",
	}
}))

type dataType = {
	step: number,
	data: any
}

type StepIndex = number | null

interface Story {
	stepIndex?: StepIndex
}

const Story: FC<Story> = ({ stepIndex }) => {
	const classes = useStyles()

	const {
		state: { layers },
		actions: { setViewport, setLayers }
	} = useContext(AppContext)

	const [currentStepIndex, setCurrentStepIndex] = useState<StepIndex>(stepIndex ?? 0);

	const onStepEnter = ({ data }: {data: dataType}) => {
		// console.log("ENTER", localLayer)
		const onEnter = data.data.onChapterEnter;

		// console.log(layersCopy, layers)
		if(onEnter.length > 0){
		setLayers((ls: any[]) => {
			let layersCopy = [...ls]
				onEnter.forEach((item: any) => {
					const isFound = layersCopy?.findIndex((stateLayer) => item.id === stateLayer.id)
					if(item.type === "marker"){
						if (item.visible === false) {

							layersCopy = layersCopy.filter(layer => layer.id !== item.id)

						} else if(isFound === -1){

							const foundData = (layersCopy[isFound]?.props.data || item.data) ?? undefined

							const newLayer = generateMarkerLayer(item.id, foundData, item.visible)
							layersCopy = [...layersCopy, newLayer]

						}
					}

					if(item.type === "raster"){
						if (item.visible === false) {

							layersCopy = layersCopy.filter(layer => layer.id !== item.id)

						} else if(isFound === -1){

							const newLayer = generateRasterLayer(item.id, item.url, item.visible)
							layersCopy = [...layersCopy, newLayer]

						}

					}
				})
				return [...layersCopy]

			})
		}

		const dataCenter = data.data.location.center
		const {center, ...rest} = data.data.location

		setCurrentStepIndex(data.step)
		setViewport({
			longitude: dataCenter[0],
			latitude: dataCenter[1],
			transitionDuration: 4000,
			transitionInterpolator: new FlyToInterpolator(),
			transitionEasing: easeCubicInOut,
			...rest
		})
	}

	const onStepExit = ({ data }: {data: dataType}) => {
		const onExit = data.data.onChapterExit;
		if(onExit.length > 0){
			setLayers((lrs: any) => {
				let layersCopy = [...lrs];
				onExit.forEach((item: any) => {
					const isFound = layersCopy.findIndex((stateLayer: any) => item.id === stateLayer.id)
					if(item.type === "marker"){
						if (item.visible === false) {

							layersCopy = layersCopy.filter(layer => layer.id !== item.id)
							console.log(layersCopy[0].id, item)

						} else if(isFound === -1){

							const foundData = (layersCopy[isFound]?.props.data || item.data) ?? undefined

							const newLayer = generateMarkerLayer(item.id, foundData, item.visible)
							layersCopy = [...layersCopy, newLayer]

						}

					}

					if(item.type === "raster"){

						if (item.visible === false) {

							layersCopy = layersCopy.filter(layer => layer.id !== item.id)

						} else if(isFound === -1){

							const newLayer = generateRasterLayer(item.id, item.url, item.visible)
							layersCopy = [...layersCopy, newLayer]

						}
					}
				})

				return [...layersCopy]
			})
		}
	}

	return <Box className={classes.storiesWrapper}>
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
							data: item
						}}
						key={`step-${i}`}
					>
						<Box
							className={classes.stepBox}
								style={{
								opacity: currentStepIndex === i ? 1 : 0.2,
								justifyContent: item.id && item.id === "forest-national-scale-layer" ? "space-between" : item.alignment === "left" ? "flex-start" : "flex-end"
							}}>
							<Paper className={classes.stepBoxItem}
							>
								<Typography variant="h3" gutterBottom>
									{item.title}
								</Typography>
								<Typography variant="body1" gutterBottom>
									{item.description}
								</Typography>
							</Paper>
							{/* {item.id === "forest-national-scale-layer" && (
								<Paper className={classes.stepBoxItem}>
									<StatisticsCounter />
								</Paper>
							)} */}
						</Box>
					</Step>
				))
			}
		</Scrollama>
	</Box>
}

export default Story;
