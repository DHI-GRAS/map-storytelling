import React, { FC } from 'react'
import { Box, Typography } from '@material-ui/core'
import {
	textOnLandingInfo,
} from 'config/infoText'
import Info from 'info/Info'

const PresentationPage: FC = () => (
	<Box width={'50vw'} position={'fixed'} style={{
		left: '4rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10000,
	}}
	>
		<Box display={'flex'} alignItems={'center'}>
			<Typography variant={'h1'} style={{ color: '#FFFFFF' }}>
				{'Welcome to the Green Map of Denmark'}
			</Typography>
			<Info
				text={textOnLandingInfo}
				popoverStyle={{ marginLeft: '1rem' }}
			/>
		</Box>
		<Typography variant={'h2'} style={{ color: '#FFFFFF' }}>
			<i>
				{'Begin your journey by clicking the green button'}
			</i>
		</Typography>
	</Box>
)

export default PresentationPage
