import React, {
	FC, useState, useRef, CSSProperties,
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Tooltip, Typography } from '@material-ui/core'
import { InfoOutlined as InfoOutlinedIcon, Info as InfoIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
	icons: {
		cursor: 'pointer',
		fontSize: 30,
	},
	// textWrapper: {
	// 	maxWidth: '30vw',
	// },
	tooltipBox: {
		backgroundColor: 'rgba(255,255,255,.7)',
		borderRadius: '4px',
	},
	tooltip: {
		border: 'none !important',
		backgroundColor: 'unset !important',
	},
}))

interface Props {
	text: string[],
	color?: string,
	popoverStyle?: CSSProperties,
}
const Info: FC<Props> = ({
	text,
	color = '#FFF',
	popoverStyle = {},
}) => {

	const [ hoverOpen, setHoverOpen ] = useState(false)
	// const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const classes = useStyles()


	return (
		<Box ml={1}>
			<Tooltip
				classes={{ tooltip: classes.tooltip }}
				placement={'right-end'}
				title={(
					<Box className={classes.tooltipBox} p={2} >
						{text.map((t, i) => (
							<Typography key={`text-${i}`} variant={'body1'} gutterBottom>
								{t}
							</Typography>
						))}
					</Box>
			)}
			>
				<Box
					style={{ color }}
					display={'flex'}
					alignItems={'center'}
					onMouseEnter={() => setHoverOpen(!hoverOpen)}
					onMouseLeave={() => setHoverOpen(!hoverOpen)}
				>
					{!hoverOpen ? <InfoOutlinedIcon className={classes.icons} /> : <InfoIcon className={classes.icons} />}
				</Box>
			</Tooltip>
		</Box>
	)

}

export default Info
