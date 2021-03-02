import React, { FC } from 'react'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	journeyButton: {
		marginTop: '1rem',
		backgroundColor: '#188D01',
		'&:hover': {
			backgroundColor: '#199600',
		},
		'&:disabled': {
			backgroundColor: '#B7F9A2',
		},
	},
}))

interface Props {
	activeStep: null | number,
	isJourneyMode: boolean,
	storyButtonDisabled: boolean,
	onJourneyModeEdit: () => void,
	onEnableMap: (is: boolean) => void,
}
const ActionButtons: FC<Props> = ({
	storyButtonDisabled = false,
	isJourneyMode,
	activeStep,
	onEnableMap,
	onJourneyModeEdit,
}) => {

	const classes = useStyles()

	return (
		<Box display={'flex'} flexDirection={'column'} position={'fixed'} style={{ top: '1rem', right: '2rem', zIndex: 10000 }}>
			{activeStep !== null && (
				<Button
					disabled={storyButtonDisabled}
					variant={'contained'}
					onClick={() => onEnableMap(isJourneyMode)}
					className={classes.journeyButton}
				>
					{isJourneyMode ? 'Explore data' : 'Continue story'}
				</Button>
			)}


			<Button
				variant={'contained'}
				onClick={onJourneyModeEdit}
				className={classes.journeyButton}
			>
				{!isJourneyMode && activeStep === null ? 'Explore the Green Map of Denmark' : 'End'}
			</Button>
		</Box>
	)

}

export default ActionButtons
