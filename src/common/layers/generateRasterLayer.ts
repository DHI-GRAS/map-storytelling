import { BitmapLayer } from '@deck.gl/layers'
import { TileLayer } from '@deck.gl/geo-layers'

const generateRasterLayer = (id: string, url: string, visible = true, opacity = 1): TileLayer<any> => new TileLayer({
	id,
	data: [ ...url ],
	minZoom: 0,
	maxZoom: 19,
	tileSize: 512,
	visible,
	opacity,
	refinementStrategy: 'no-overlap',
	renderSubLayers: props => {

		const {
			  bbox: {
				west, south, east, north,
			},
		} = props.tile

		return new BitmapLayer(props, {
			  data: null,
			  image: props.data,
			  bounds: [ west, south, east, north ],
		})

	},
})

export default generateRasterLayer
