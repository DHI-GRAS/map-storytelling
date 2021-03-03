import React, {
	FC,
	useState,
	useMemo,
	useEffect,
	useRef,
	ReactElement,
	createElement,
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import configFile from 'config/config'

const useStyles = makeStyles(() => ({
	storiesWrapper: {
		position: 'absolute',
		overflow: 'auto',
		margin: '0',
		// border: '2px dashed skyblue',
		width: '100vw',
		zIndex: 1000,
	},
	footerBar: {
		width: '100%',
		padding: '16px',
		backgroundColor: 'rgba(255,255,255, .8)',
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
		<Box position={'relative'} ref={(el: HTMLDivElement | null) => {

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

		if (activeStep !== 0) window.scrollTo({ top: ranges[ activeStep - 1 ] })
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
				{
					configFile.footer?.type === 'text' && (
						<Box className={classes.footerBar}>
							<Typography variant={'body2'} align={'center'}>
								{configFile.footer.text}
							</Typography>
						</Box>
					)
				}
				{
					configFile.footer?.type === 'component' && createElement(configFile.footer.component)
				}
			</div>
		</Box>
	)

}

export default Scroll
