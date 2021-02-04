import { GeoJsonLayer, RGBAColor } from '@deck.gl/layers'
// import clorData from 'common/data/forest_cloropleth.json'
import denmark from 'common/data/Denmark.json'

const getRGBA = (val: number): RGBAColor => {

	if (val < 1000) return [ 213, 221, 119, 255 ]

	if (val < 2000) return [ 189, 204, 102, 255 ]

	if (val < 3000) return [ 169, 190, 83, 255 ]

	if (val < 4000) return [ 124, 165, 62, 255 ]

	if (val < 5000) return [ 56, 130, 48, 255 ]

	return [ 239, 237, 143, 255 ]


}

const generateClorLayer = (
	id: string,
	visible = true,
	data: any,
	opacity = 1,
	extruded = true
): GeoJsonLayer<any> => new GeoJsonLayer({
	id,
	data,
	pickable: true,
	visible,
	stroked: false,
	filled: true,
	extruded,
	wireframe: true,
	opacity,
	lineWidthMinPixels: 4,
	getFillColor: f => getRGBA(f.properties.m2_skov_pe),
	getElevation: f => f.properties.m2_skov_pe,
	getLineColor: [ 255, 255, 255, 40 ],
	getLineWidth: 1,
})

export default generateClorLayer
