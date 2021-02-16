/* eslint-disable import/no-extraneous-dependencies */
import { TextLayer, IconLayer } from '@deck.gl/layers'

type ReturnType = TextLayer<any> | IconLayer<any>

interface Data {
	id: string,
	coordinates: [number, number],
	text: string,
	elevation: number,
}

const generateTextMarkerLayer =
(id: string, data: Data[]): ReturnType[] =>
	data.reduce((acc: ReturnType[], item: Data, i: number) => {

		// if (!acc) acc = []
		const textLayer = new TextLayer({
			id: `${id}-${i}-textbox`,
			data: [ item ],
			getPosition: d => d.coordinates,
			getText: d => d.text,
			getColor: () => [ 0, 0, 0, 255 ],
			backgroundColor: [ 255, 255, 255 ],
			getSize: 28,
			getTextAnchor: 'middle',
			getAlignmentBaseline: 'center',
			getPixelOffset: [ 0, -16 + (-1 * (item.elevation || 0)) ],
		})

		const markerL = new IconLayer({
			id: `${id}-${i}-marker`,
			data: [ item ],
			iconAtlas: 'https://grasdatastorage.blob.core.windows.net/images/popup-arrow.png',
			iconMapping: {
				marker: {
					x: 0,
					y: 0,
					width: 388,
					height: 207,
					mask: false,
				},
			},
			getIcon: () => 'marker',
			sizeScale: 6,
			getPosition: (d: any) => d.coordinates,
			getSize: () => 4,
			getPixelOffset: [ 0, 0 + (-1 * (item.elevation || 0)) ],
		})

		return [ ...acc, markerL, textLayer ]

	}, [])

export default generateTextMarkerLayer
