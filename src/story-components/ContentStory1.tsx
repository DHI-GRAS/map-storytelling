import React, { FC } from 'react'
import { Box, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Info from 'info/Info'
import StatisticsCounter from 'barchart-counters//StatisticsCounter'
import { forestArea } from 'common/data/forestAreaData'
import { forestPerInhabitant } from 'common/data/forestPerInhabitant'

const useStyles = makeStyles(() => ({
	stepBoxItem: {
		padding: '2rem',
		backgroundColor: 'rgba(255,255,255, .7)',
	},
}))

export const textSlide1Info = [
	'With up-to-date satellite imagery and novel AI technology, national level forest cover can be mapped quickly and efficiently and updated as often as needed (monthly/yearly).',
	'This data provides information to continuously assess carbon storage, report on national forest cover, extent assess and monitor the effect of national forest management programmes, and much more…',
]

const ContentStory1: FC = () => {

	const classes = useStyles()

	return (
		<Box width={'100%'} height={'100%'}>
			<Box display={'flex'}>
				<Paper className={classes.stepBoxItem}>
					<Typography variant={'h3'} gutterBottom>
						{'Updated national forest map'}
					</Typography>
					<Typography variant={'body1'} gutterBottom>
						{'Up to date national forest map from 2020'}
					</Typography>
					<Box style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} p={0.5} width={1} mt={2}>
						<StatisticsCounter title={'Most forest cover (km2)'} items={forestArea} heightScale={6} />
					</Box>
					<Box style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} p={0.5} width={1} mt={2}>
						<StatisticsCounter title={'m2 forest/inhabitant'} items={forestPerInhabitant} heightScale={6} />
					</Box>
				</Paper>
				<Info
					text={textSlide1Info}
					popoverStyle={{ marginLeft: '1rem' }}
				/>
			</Box>
		</Box>
	)

}

export default ContentStory1
