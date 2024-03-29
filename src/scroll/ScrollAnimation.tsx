import React, { FC, useState, useEffect } from 'react'
import { Fade, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	wrapper: {
		'&:hover': {
			'& $scrollText': {
				opacity: 1,
			},
		},
	},
	scrollText: {
		color: '#FFF',
		fontSize: '12px',
		opacity: 0.5,
		transition: 'all .2s ease',
	},
}))

interface Props {
	text?: string,
}

const ScrollAnimation: FC<Props> = ({
	text,
}) => {

	const [ open, setOpen ] = useState(true)
	const classes = useStyles()

	useEffect(() => {

		const int = setInterval(() => setOpen(!open), 1000)

		return () => clearInterval(int)

	}, [ open ])

	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			alignItems={'center'}
			className={classes.wrapper}
		>
			<svg height={'50px'} width={'50px'} fill={'#FFFFFF'} viewBox={'0 0 24 24'} version={'1.1'} x={'0px'} y={'0px'}>
				<title>
					{'Scroll'}
				</title>
				<desc>
					{'Created with Sketch.'}
				</desc>
				<g stroke={'none'} strokeWidth={'1'} fill={'none'} fillRule={'evenodd'}>
					<g transform={'translate(6.000000, 1.000000)'} fill={'#FFFFFF'} fillRule={'nonzero'}>
						<path d={'M6,1.5 C3.51471863,1.5 1.5,3.51471863 1.5,6 L1.5,12 C1.5,14.4852814 3.51471863,16.5 6,16.5 C8.48528137,16.5 10.5,14.4852814 10.5,12 L10.5,6 C10.5,3.51471863 8.48528137,1.5 6,1.5 Z M6,0 C9.3137085,-5.55111512e-16 12,2.6862915 12,6 L12,12 C12,15.3137085 9.3137085,18 6,18 C2.6862915,18 0,15.3137085 0,12 L0,6 C0,2.6862915 2.6862915,6.66133815e-16 6,0 Z'}></path>
						<path d={'M5.25,4.5 C5.25,4.08578644 5.58578644,3.75 6,3.75 C6.41421356,3.75 6.75,4.08578644 6.75,4.5 L6.75,8.5 C6.75,8.91421356 6.41421356,9.25 6,9.25 C5.58578644,9.25 5.25,8.91421356 5.25,8.5 L5.25,4.5 Z'}></path>
						<Fade in={open} timeout={1000}>
							<g transform={'translate(1.000000, 18.000000)'}>
								<path d={'M5.3721042,4.15118236 C5.01246612,4.35668983 4.55432512,4.23174229 4.34881764,3.8721042 C4.14331017,3.51246612 4.26825771,3.05432512 4.6278958,2.84881764 L8.1278958,0.848817643 C8.48753388,0.643310166 8.94567488,0.768257711 9.15118236,1.1278958 C9.35668983,1.48753388 9.23174229,1.94567488 8.8721042,2.15118236 L5.3721042,4.15118236 Z'}></path>
								<path d={'M5.3721042,2.84881764 C5.73174229,3.05432512 5.85668983,3.51246612 5.65118236,3.8721042 C5.44567488,4.23174229 4.98753388,4.35668983 4.6278958,4.15118236 L1.1278958,2.15118236 C0.768257711,1.94567488 0.643310166,1.48753388 0.848817643,1.1278958 C1.05432512,0.768257711 1.51246612,0.643310166 1.8721042,0.848817643 L5.3721042,2.84881764 Z'}></path>
							</g>
						</Fade>
					</g>
				</g>
			</svg>
			{text && (
				<Box mt={1}>
					<Typography variant={'body2'} className={classes.scrollText}>
						{text}
					</Typography>
				</Box>
			)
			}

		</Box>
	)

}

export default ScrollAnimation
