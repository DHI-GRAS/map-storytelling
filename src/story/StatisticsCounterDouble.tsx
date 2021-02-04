import React, { FC, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { DoubleData } from 'common/data/doubleData'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import CountingItemDouble from './CountingItemDouble'

interface Props {
	items: DoubleData[],
	title: String,
}

const StatisticsCounter: FC<Props> = ({ items, title }) => {

	const [ isExpanded, setIsExpanded ] = useState(true)

	return (
		<Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} width={365}>
			<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
				<Typography variant={'h4'} align={'center'}>
					{title}
				</Typography>
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					p={1}
					onClick={() => setIsExpanded(!isExpanded)}
					style={{ cursor: 'pointer' }}
				>
					{isExpanded ? <ExpandMoreIcon color={'primary'} /> : <ExpandLessIcon color={'primary'} />}
				</Box>
			</Box>
			{isExpanded && (
				<Box display={'flex'} p={0}>
					{items.map((item, i) => (
						<CountingItemDouble
							key={`county-${i}`}
							max1={item.maxVal1}
							max2={item.maxVal2}
							name={item.name}
							duration={item.duration}
						/>
					))}
				</Box>
			)}
		</Box>
	)

}

export default StatisticsCounter
