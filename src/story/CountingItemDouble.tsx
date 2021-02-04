import React, { FC, useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CountingItem from './CountingItem'

const useStyles = makeStyles(theme => ({
	barBox1: {
		backgroundColor: theme.palette.secondary.main,
		width: 20,
	},
	barBox2: {
		backgroundColor: '#FF8A00',
		width: 20,
	},
}))

interface Props {
	max1: number,
	max2: number,
	name: string,
	duration: number,
}

const DoubleCountingItem: FC<Props> = ({
	max1, max2, name, duration,
}) => {

	const [ value1, setValue1 ] = useState(0)
	const [ value2, setValue2 ] = useState(0)

	const classes = useStyles()

	const divideBy = val => {

		if (val < 500) return 5


		if (val < 3000) return 40


		if (val < 8000) return 80


		if (val < 26000) return 150

		return 2

	}

	const divideBymax1 = divideBy(max1)
	const divideBymax2 = divideBy(max2)

	useEffect(() => {

		let start1 = 0
		let start2 = 0

		// eslint-disable-next-line radix
		const end1 = parseInt(String(max1).substring(0, 3))
		const end2 = parseInt(String(max2).substring(0, 3))

		if (start1 === end1) return
		if (start2 === end2) return

		const incrementTime1 = (duration / end1) * 1000
		const incrementTime2 = (duration / end2) * 1000

		const timer1 = setInterval(() => {

			start1 += 1
			const toCount1 = String(start1) + String(max1).substring(3)
			setValue1(Number(toCount1))
			if (start1 === end1) clearInterval(timer1)

		}, incrementTime1)

		const timer2 = setInterval(() => {

			start2 += 1
			const toCount = String(start2) + String(max2).substring(3)
			setValue2(Number(toCount))
			if (start2 === end2) clearInterval(timer2)

		}, incrementTime2)

		return () => {

			clearInterval(timer2); clearInterval(timer1)

		}


	}, [ max1, max2, duration ])

	return (
		<Box p={1} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'flex-end'} height={200}>

			<Box display={'flex'} alignItems={'flex-end'} justifyContent={'center'} >
				<Box mr={0.2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'flex-end'}>
					<Typography variant={'body1'} gutterBottom>
						{value1}
					</Typography>
					<Box className={classes.barBox2} style={{ height: value1 / divideBymax1 }} />
				</Box>
				<Box ml={0.2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'flex-end'}>
					<Typography variant={'body1'} gutterBottom>
						{value2}
					</Typography>
					<Box className={classes.barBox1} style={{ height: value2 / divideBymax2 }} />
				</Box>
			</Box>
			<Typography variant={'body2'} style={{ fontSize: 12 }}>
				{name}
			</Typography>
		</Box>

	)

}

export default DoubleCountingItem
