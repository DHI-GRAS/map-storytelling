import React, { FC, useState } from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Map from "map/Map"
import configFile from "common/data/config"

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100vh',
		margin: 0,
		padding: 0,
		// height: window.innerHeight,
	},
	leftBorder: {
		borderLeft: '1px solid #DBE4E9',
	},
	topBorder: {
		borderTop: '1px solid #DBE4E9',
	},
})

const AppScreen: FC = () => {

	const classes = useStyles()
	const [viewport, setViewport] = useState({
		latitude: 55.513295,
		longitude: 10.165798,
		zoom: 7.5,
		bearing: 35,
		pitch: 60,
	})

	return (
		<div className={classes.root}>
			<Map view={viewport}/>
		</div>
	)

}
export default AppScreen
