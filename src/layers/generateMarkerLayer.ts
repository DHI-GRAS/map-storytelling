// eslint-disable-next-line import/no-extraneous-dependencies
import { IconLayer } from '@deck.gl/layers'

const generateMarkerLayer = (id: string, data: any[] = [], visible = true,): IconLayer<any> => new IconLayer({
	id,
	visible,
	data,
	iconAtlas: 'https://grasdatastorage.blob.core.windows.net/images/marker_gras.png',
	iconMapping: {
		marker: {
			x: 2,
			y: 5,
			width: 128,
			height: 128,
			anchorX: 128,
			anchorY: 128,
			mask: false,
		},
	},

	getIcon: () => 'marker',
	sizeScale: 15,
	getPosition: (d: any) => d.coordinates,
	getSize: () => 5,
})

export default generateMarkerLayer
