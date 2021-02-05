import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

}))

interface Props {
	Comp: FC,
}
const Scroll: FC<Props> = ({
	Comp,
}) => {

	const classes = useStyles()
	const HOCScroll = props => <Comp {...props} />

	return (
		HOCScroll
	)

}

export default Scroll
