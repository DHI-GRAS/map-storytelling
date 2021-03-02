import React, { FC } from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import StatisticsCounter from 'barchart-counters/StatisticsCounter'
import Info from 'info/Info'
import aarhusData from 'common/data/aarhusData'

const textSlide3Info = [
	'As an example, Aarhus municipality has a strategic goal of increasing the forest cover by 3200 hectares before 2030. Approximately 200 hectares (2 km2) of forest needs to be raised each year to reach that target. With this tool, we can calculate how much forest is raised, month by month, until 2030 (and beyond). This way, everyone can follow the progress of efforts to make Denmark greener.',
]

const useStyles = makeStyles(() => ({
	stepBoxItem: {
		padding: '2rem',
		backgroundColor: 'rgba(255,255,255, .7)',
	},
}))

const ContentStory3: FC = () => {

	const classes = useStyles()

	return (
		<Box width={1} height={1}>
			<Box display={'flex'}>
				<Paper className={classes.stepBoxItem} style={{
					display: 'flex', alignItems: 'center', flexDirection: 'column',
				}}
				>
					<Box display={'flex'}>
						<Typography variant={'h3'} gutterBottom style={{ maxWidth: 120 }}>
							{'Forest cover in Aarhus municipality'}
						</Typography>
					</Box>
					<Box style={{ backgroundColor: 'rgba(255,255,255,0.3)', maxWidth: 100 }} p={0.5} mt={2}>
						<StatisticsCounter title={'km2'} items={aarhusData} heightScale={1} />
					</Box>
				</Paper>
				<Info
					text={textSlide3Info}
					popoverStyle={{ marginLeft: '1rem' }}
				/>
			</Box>
		</Box>
	)

}

export default ContentStory3
