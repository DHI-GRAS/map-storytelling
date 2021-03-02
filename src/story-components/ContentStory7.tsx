import React, { FC } from 'react'
import { Box, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Info from 'info/Info'
import doubleData from 'common/data/doubleData'
import StatisticsCounterDouble from 'barchart-counters/StatisticsCounterDouble'

const textSlide7Info = [
	'Using deep learning and very high resolution data, we can go into even greater details by mapping each individual green landscape feature. In this example, we have used a combination of LIDAR intensity data, a normalised elevation model (nDSM), GeoDK vector reference data and aerial imagery (10 cm resolution) to map and quantify the amount of green objects in Gedser, Denmark.',
]

const useStyles = makeStyles(() => ({
	colorBox: {
		width: 16,
		height: 16,
	},
	stepBoxItem: {
		padding: '2rem',
		backgroundColor: 'rgba(255,255,255, .7)',
	},
	legendText: {
		fontSize: '12px',
	},
}))

const ContentStory7: FC = () => {

	const classes = useStyles()

	return (
		<Box width={1} height={1}>
			<Box display={'flex'}>
				<Paper className={classes.stepBoxItem} style={{ minWidth: 450 }}>
					<Box style={{ maxWidth: 400 }}>
						<Typography variant={'h3'} gutterBottom>
							{'The dynamic green Denmark in even greater details'}
						</Typography>
						<Typography variant={'body1'} gutterBottom>
							{'All the small green objects in our cities and rural areas'}
						</Typography>
						<Typography variant={'body2'}>
							<i>
								{'(In this example, we have quantified all green features in 2019 and 2020, in a 1 km2 area of interest in Gedser, Denmark)'}
							</i>
						</Typography>
					</Box>
					<Box style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} p={0.5} width={1} mt={2}>
						<StatisticsCounterDouble title={'2019 - 2020'} items={doubleData} heightScale={3} />
					</Box>
					<Box mt={1} display={'flex'}>
						<Box mx={1} display={'flex'}>
							<Box className={classes.colorBox} style={{ backgroundColor: '#FF8A00' }} />
							<Box ml={0.5}>
								<Typography variant={'body1'} className={classes.legendText}>
									{'2019'}
								</Typography>
							</Box>
						</Box>
						<Box mx={1} display={'flex'}>
							<Box className={classes.colorBox} style={{ backgroundColor: '#00A4EC' }} />
							<Box ml={0.5}>
								<Typography variant={'body1'} className={classes.legendText}>
									{'2020'}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Paper>
				<Info
					text={textSlide7Info}
					popoverStyle={{ marginLeft: '1rem' }}
				/>
			</Box>
		</Box>
	)

}

export default ContentStory7
