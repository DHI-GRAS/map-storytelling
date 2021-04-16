import React, { FC } from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Info from 'info/Info'

const useStyles = makeStyles(() => ({
	stepBoxItem: {
		padding: '2rem',
		backgroundColor: 'rgba(255,255,255, .7)',
	},
}))

interface Props {
	title?: string,
	description?: string,
	info?: string[],
}
const BasicStoryTemplate: FC<Props> = ({
	title,
	description,
	info,
}) => {

	const classes = useStyles()

	return (
		<Box display={'flex'} maxWidth={'40%'}>
			<Paper className={classes.stepBoxItem}>
				{title && (
				<Typography variant={'h3'} gutterBottom>
					{title}
				</Typography>
				)}
				{description && (
				<Typography variant={'body1'} gutterBottom>
					{description}
				</Typography>
				)}
			</Paper>
			{info && (
			<Info
				text={info}
				popoverStyle={{ marginLeft: '1rem' }}
			/>
			)}
		</Box>
	)

}

export default BasicStoryTemplate
