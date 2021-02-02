import React, { FC, useEffect, useState } from "react"
import { Box, Typography } from "@material-ui/core"

type ForestArea = { name: string, val: number, maxVal: number }

const forestAreaDefault = {
	"Ringkøbing-Skjern" : {
		val: 0,
		maxVal: 184
	},
	Vejle: {
		val: 0,
		maxVal: 209
	},
	Viborg: {
		val: 0,
		maxVal: 239
	},
	Herning: {
		val: 0,
		maxVal: 251
	},
	Silkeborg: {
		val: 0,
		maxVal: 251
	},
}

const StatisticsCounter: FC = () => {
	const [forestArea, setForestArea] = useState(forestAreaDefault)

	useEffect(() => {
		Object.keys(forestArea).map((item) => setInterval(() =>
			setForestArea((obj) => {
				obj[item] = {...obj[item], val: obj[item].val + 2}
				return ({ ...obj, obj[item] })
			})
		, 100))

	}, [])

	return (
	<Box display="flex">
		{Object.keys(forestArea).map(item => (
			<Box p={1}>
				<Typography variant={"body1"} gutterBottom>
					{forestArea[item].val}
				</Typography>
				<Typography variant={"h4"}>
					{forestArea[item].name}
				</Typography>
			</Box>
		))}
	</Box>
	)
}

export default StatisticsCounter;
