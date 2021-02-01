import React, { FC, useState, useContext } from "react"
import { Box, Typography, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Scrollama, Step } from 'react-scrollama';
import configFile from "common/data/config"
import {AppContext} from "app-screen/AppScreen"
import{ FlyToInterpolator } from 'react-map-gl';
import { easeCubicInOut } from 'd3-ease'

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

	const { actions: { setViewport } } = useContext(AppContext)


	const [currentStepIndex, setCurrentStepIndex] = useState<StepIndex>(stepIndex ?? 0);

	const onStepEnter = ({ data }: {data: dataType}) => {
		const dataCenter = data.data.location.center
		const {center, ...rest} = data.data.location
		setCurrentStepIndex(data.step)
		setViewport({
			longitude: dataCenter[0],
			latitude: dataCenter[1],
			transitionDuration: 2000,
			transitionInterpolator: new FlyToInterpolator(),
			transitionEasing: easeCubicInOut,
			...rest
		})
	}

	return <Box className={classes.storiesWrapper}>
		<Scrollama onStepEnter={onStepEnter} debug>
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
