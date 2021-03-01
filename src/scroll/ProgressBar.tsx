import React, { FC, useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	wrapper: {
		backgroundColor: '#BFE7B7',
		opacity: 0.8,
		borderRadius: 2,
	},
	percentCounter: {
		color: '#FFF',
		fontWeight: 300,
		fontSize: '12px',
	},
	innerBox: {
		backgroundColor: '#61C051',
		borderRadius: 2,
		minWidth: 26,
		transition: '.6s all linear',
	},
}))

interface Props {
	step: number,
	totalSteps: number,
}
const ProgressBar: FC<Props> = ({
	step,
	totalSteps,
}) => {

	const classes = useStyles()
	const boxWidth = 200
	useEffect(() => {

	}, [ step, totalSteps ])

	return (
		<Box p={0.1} className={classes.wrapper} width={boxWidth}>
			<Box
				display={'flex'}
				className={classes.innerBox}
				width={(boxWidth * step) / totalSteps}
				alignItems={'center'}
				justifyContent={'flex-end'}
				pr={0.4}
			>
				<Typography variant={'body2'} className={classes.percentCounter}>
					{`${((step / totalSteps) * 100).toFixed()}%`}
				</Typography>
			</Box>
		</Box>
	)

}

export default ProgressBar
