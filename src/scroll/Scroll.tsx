import React, {
	FC,
	useState,
	useMemo,
	useEffect,
	useRef,
	ReactElement,
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	storiesWrapper: {
		position: 'absolute',
		overflow: 'auto',
		margin: '0',
		// border: '2px dashed skyblue',
		width: '100vw',
		zIndex: 1000,
	},
}))

interface Props {
	activeStep: number,
	data: any,
	children: ReactElement[],
	topOffset?: number,
	onChangeStep: (step: number, dataAfter: any, dataBefore?: any,) => void,
	debug?: boolean,
}
const Scroll: FC<Props> = ({
	data,
	activeStep,
	children,
	topOffset = 100,
	onChangeStep,
	debug,
}) => {

	const [ currentScrollTop, setCurrentScrollTop ] = useState(0)
	let ranges: number[] = useMemo(() => [], [])
	const wrapperRef = useRef(null)
	// const refArray = useRef(new Array())
	const classes = useStyles()

	const HOCCopy = (props: any, child: ReactElement, key: number) => (
		<Box ref={(el: HTMLDivElement | null) => {

			if (el) ranges = [ ...ranges, (ranges[ ranges.length - 1 ] || 0) + el.scrollHeight ]


		}} {...props} key={`scroll-item-${key}`}
		>
			{child}
		</Box>
	)

	useEffect(() => {


	}, [ activeStep ])

	useEffect(() => {


		const theInd = ranges.findIndex(rng => currentScrollTop <= (rng - topOffset))
		if (theInd !== activeStep && theInd > -1) onChangeStep(theInd, data[ theInd ], data[ activeStep ])

	}, [ currentScrollTop ])

	useEffect(() => {

		onChangeStep(activeStep, data[ activeStep ])
		window.addEventListener('scroll', (e: Event) => {

			window.requestAnimationFrame(() => {

				setCurrentScrollTop((e.target as any)?.scrollingElement.scrollTop.toFixed())

			})

		})

	}, [])


	return (
		<Box width={'100vw'} height={'100%'} position={'relative'} >
			{
				debug && <Box mt={`${topOffset}px`} position={'fixed'} width={'100%'} height={2} style={{ border: '1px dashed white' }} />
			}
			<div className={classes.storiesWrapper} ref={wrapperRef} key={activeStep}>
				{
					children.map((child, i) => HOCCopy(child.props, child.props.children, i))
				}
			</div>
		</Box>
	)

}

export default Scroll
