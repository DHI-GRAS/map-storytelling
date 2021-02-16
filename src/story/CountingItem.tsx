import React, { FC, useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	barBox: {
		backgroundColor: theme.palette.secondary.main,
		width: 20,
	},
}))

interface Props {
	max: number,
	name: string,
	duration: number,
	scale?: number,
}

const CountingItem: FC<Props> = ({
	max, name, duration, scale = 1,
}) => {

	const [ value, setValue ] = useState(0)
	const classes = useStyles()
	useEffect(() => {

		let start = 0
		const isWithDecimals = max % 1 !== 0
		// eslint-disable-next-line radix
		const decimalsAppend = isWithDecimals && Number(String(max).split('.')[ 1 ])
		const copyMax = isWithDecimals ? Number(String(max).split('.')[ 0 ]) : max
		const end = parseInt(String(copyMax).substring(0, 3))


		if (start === end) return

		const incrementTime = (duration / end) * 1000
		const timer = setInterval(() => {

			start += 1
			const toCount = String(start) + String(copyMax).substring(3)
			setValue(Number(toCount))
			if (start === end) {

				isWithDecimals && setValue(Number(`${toCount}.${String(decimalsAppend)}`))
				clearInterval(timer)

			}

		}, incrementTime)

		return () => clearInterval(timer)

	}, [ max, duration ])

	return (
		<Box p={'2px'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'flex-end'} height={200}>
			<Typography variant={'h4'} gutterBottom>
				{value}
			</Typography>
			<Box className={classes.barBox} style={{ height: value / scale }} />
			<Typography variant={'body2'} style={{ fontSize: 12 }}>
				{name}
			</Typography>
		</Box>
	)

}

export default CountingItem
