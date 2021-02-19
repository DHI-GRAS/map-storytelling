import React, { FC, CSSProperties } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	wrapper: {
		color: '#555',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'nowrap',
	},
	legendHeader: {
		fontWeight: 600,
		display: 'flex',
		color: '#0B4566',
		justifyContent: 'flex-end',
		fontSize: 12,
		padding: 5,
	},
	tick: {
		fontSize: 14,
		opacity: 1,
		color: '#0B4566',
		marginLeft: 10,
	},
	color: {
		width: 22,
		height: 20,
	},
	colorTickWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 'auto',
		height: 30,
	},
}))

type colorsArr = {
	name: string,
	color: string,
}

interface Props {
	title?: string,
	unit?: string,
	items: colorsArr[],
	style?: CSSProperties,
	headerBackground?: string,
	legendBackground?: string,
}

const Legend: FC<Props> = ({
	title,
	unit,
	items,
	style = {},
	headerBackground = 'rgba(255,255,255,.3)',
	legendBackground = 'rgba(248,248,248,.7)',
}) => {

	const classes = useStyles()

	return (
		<Box className={classes.wrapper} style={{ ...style, backgroundColor: legendBackground }}>
			{title && (
				<Box className={classes.legendHeader} style={{ backgroundColor: headerBackground }}>
					<Box p={'1px 5px'}>
						{title.split(' ').map((word, i) => (
							<Typography key={`item-${i}`}>
								{word}
							</Typography>
						))}
					</Box>
				</Box>
			)}

			<Box p={1}>
				{unit && (
					<Box display={'flex'} className={classes.colorTickWrapper}>
						<span className={classes.tick}>
							<Typography variant={'body1'}>
								<i>
									{unit}
								</i>
							</Typography>
						</span>
						<Box className={classes.color}></Box>
					</Box>
				)}
				{items.map((item, i) => (
					<Box key={`color-${i}`} display={'flex'} className={classes.colorTickWrapper}>
						<Box className={classes.color} style={{ backgroundColor: item.color }} />
						<span className={classes.tick}>
							<Typography variant={'body1'}>
								{item.name}
							</Typography>
						</span>
					</Box>
				))}
			</Box>
		</Box>
	)

}

export default Legend
