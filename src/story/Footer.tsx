import React, { FC, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	footerBar: {
		width: '100%',
		padding: '16px',
		backgroundColor: 'rgba(255,255,255, .8)',
	},
}))

const Footer: FC = () => {

	const classes = useStyles()

	return (
		<Box className={classes.footerBar}>
			<Typography variant={'body2'} align={'center'}>
				{'For more information visit us at '}
				<span >
					<a
						href={'https://www.dhi-gras.com/'}
						style={{ textDecoration: 'none', color: '#00a4ec' }}
						target={'_blank'}
						rel={'noopener noreferrer'}
					>
						{'www.dhi-gras.com'}
					</a>
				</span>
			</Typography>
		</Box>
	)

}

export default Footer
