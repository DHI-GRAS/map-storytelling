import React, { FC, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { ForestArea } from 'common/data/forestAreaData'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import CountingItem from './CountingItem'

interface Props {
	items: ForestArea[],
	title: String,
	heightScale?: number,
}

const StatisticsCounter: FC<Props> = ({ items, title, heightScale }) => {

	const [ isExpanded, setIsExpanded ] = useState(true)

	return (
		<Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
			<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
				<Typography variant={'h4'} align={'center'}>
					{title}
				</Typography>
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					p={'2px'}
					onClick={() => setIsExpanded(!isExpanded)}
					style={{ cursor: 'pointer' }}
				>
					{isExpanded ? <ExpandMoreIcon color={'primary'} /> : <ExpandLessIcon color={'primary'} />}
				</Box>
			</Box>
			{isExpanded && (
				<Box display={'flex'} p={0}>
					{items.map((item, i) => (
						<CountingItem
							key={`county-${i}`}
							max={item.maxVal}
							name={item.name}
							duration={item.duration}
							scale={heightScale}
						/>
					))}
				</Box>
			)}
		</Box>
	)

}

export default StatisticsCounter
