import React, { FC, useState, CSSProperties } from 'react'
import { Box, Typography } from '@material-ui/core'
import videoFile from 'common/images/story-landing-video-1.mp4'
import videoPoster from 'common/images/loading_video.jpg'

const bannerVideo: CSSProperties = {
	minWidth: 150,
	marginTop: '1rem',
	width: '30%',
	height: 'auto',
	zIndex: -1,
}

const ContentStory0: FC = () => (
	<Box display={'flex'} flexDirection={'column'}>
		<Box width={'50vw'} mb={1}>
			<Typography variant={'h1'} style={{ color: '#FFFFFF' }}>
				{'The green map of Denmark'}
			</Typography>
			<Typography variant={'h2'} style={{ color: '#FFFFFF' }}>
				<i>
					{'The gateway to an up to date and timely overview of the green Denmark'}
				</i>
			</Typography>
		</Box>
		<video autoPlay loop muted style={bannerVideo} poster={videoPoster}>
			<source
				src={videoFile}
				type={'video/mp4'}
			/>
		</video>
	</Box>
)

export default ContentStory0
