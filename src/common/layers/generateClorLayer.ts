import { GeoJsonLayer } from '@deck.gl/layers'

const getRGBA = (val: number): any => {

	if (val < 100) return [ 239, 237, 143, 255 ]
	if (val < 500) return [ 216, 224, 131, 255 ]
	if (val < 1000) return [ 193, 210, 119, 255 ]
	if (val < 1500) return [ 170, 197, 107, 255 ]
	if (val < 2000) return [ 148, 184, 96, 255 ]
	if (val < 3000) return [ 125, 170, 84, 255 ]
	if (val < 4000) return [ 102, 157, 72, 255 ]
	if (val < 5000) return [ 56, 130, 48, 255 ]
	if (val > 5000) return [ 56, 130, 48, 255 ]


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
	getElevation: f => f.properties.m2_skov_pe * 2,
	getLineColor: [ 255, 255, 255, 40 ],
	getLineWidth: 1,
})

export default generateClorLayer
