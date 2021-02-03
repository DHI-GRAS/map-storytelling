import React, { FC, useEffect, useState } from "react"
import { Box, Typography } from "@material-ui/core"
import CountingItem from "./CountingItem"
import { ForestArea } from "common/data/forestAreaData"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

interface Props {
	items: ForestArea[],
	title: String
}

const StatisticsCounter: FC<Props> = ({ items, title }) => {
	const [isExpanded, setIsExpanded] = useState(true)

	return (
		<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant={"h3"} align="center">
					{title}
				</Typography>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					p={1}
					onClick={() => setIsExpanded(!isExpanded)}
					style={{cursor: "pointer"}}
				>
					{isExpanded ? <ExpandMoreIcon color="primary" /> : <ExpandLessIcon color="primary" />}
				</Box>
			</Box>
			{isExpanded && (
				<Box display="flex" p={1}>
					{items.map((item, i) => (
						<CountingItem
							key={`county-${i}`}
							max={item.maxVal}
							name={item.name}
							duration={item.duration}
						/>
					))}
				</Box>
			)}
		</Box>
	)
}

export default StatisticsCounter;
