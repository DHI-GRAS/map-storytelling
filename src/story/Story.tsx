import React, { FC, useState, useContext } from "react"
import { Box, Typography, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Scrollama, Step } from 'react-scrollama';
import configFile from "common/data/config"
import {AppContext} from "app-screen/AppScreen"
import { FlyToInterpolator } from 'react-map-gl';
import { IconLayer } from '@deck.gl/layers';
import { easeCubicInOut } from 'd3-ease'
import generateMarkerLayer from "common/layers/generateMarkerLayer"

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

	const { state: { layers }, actions: { setViewport, setLayers } } = useContext(AppContext)

	const [currentStepIndex, setCurrentStepIndex] = useState<StepIndex>(stepIndex ?? 0);

	const onStepEnter = ({ data }: {data: dataType}) => {

		const onEnter = data.data.onChapterEnter;
		if(onEnter.length > 0){
			let layersCopy = layers;
			onEnter.forEach((item: any) => {
				const isFound = layers.findIndex((stateLayer) => item.layer === stateLayer.props.id)
				console.log(isFound)
				const foundData = (layers[isFound]?.props.data || item.data) ?? undefined
				const newLayer = generateMarkerLayer(item.layer, foundData, item.visible)

				layersCopy = [...layersCopy, newLayer]
			})

			setLayers([...layersCopy])
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

			let layersCopy = layers;
			onExit.forEach((item: any) => {
				const isFound = layers.findIndex((stateLayer) => item.layer === stateLayer.props.id)
				const foundData = (layers[isFound]?.props.data || item.data) ?? undefined
				const newLayer = generateMarkerLayer(item.layer, foundData, item.visible)

				layersCopy = [...layersCopy, newLayer]
			})

			setLayers([...layersCopy])
		}
	}

	return <Box className={classes.storiesWrapper}>
		<Scrollama onStepEnter={onStepEnter} onStepExit={onStepExit} debug={undefined}>
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
							justifyContent: item.alignment === "left" ? "flex-start" : "flex-end"
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
						</Box>
					</Step>
				))
			}
		</Scrollama>
	</Box>
}

export default Story;
