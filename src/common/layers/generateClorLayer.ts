// eslint-disable-next-line import/no-extraneous-dependencies
import { GeoJsonLayer } from '@deck.gl/layers'

const getRGBA = (val: number): [number, number, number, number] => {

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

const getKmRGBA = (val: number): [number, number, number, number] => {


	if (val < 5) return [ 239, 237, 143, 255 ]
	if (val < 10) return [ 224, 228, 135, 255 ]
	if (val < 25) return [ 193, 210, 119, 255 ]
	if (val < 50) return [ 178, 201, 111, 255 ]
	if (val < 75) return [ 148, 183, 95, 255 ]
	if (val < 100) return [ 132, 175, 88, 255 ]
	if (val < 125) return [ 117, 166, 80, 255 ]
	if (val < 150) return [ 102, 157, 72, 255 ]
	if (val < 200) return [ 87, 148, 64, 255 ]
	if (val < 250) return [ 71, 139, 56, 255 ]
	if (val > 250) return [ 56, 130, 48, 255 ]


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
	getFillColor: f => (id !== 'communes-cloropeth-layer-opacity' ? getRGBA(f.properties.m2_skov_pe) : getKmRGBA(f.properties.Km2)),
	getElevation: f => f.properties.m2_skov_pe * 2,
	getLineColor: f => getRGBA(f.properties.m2_skov_pe),
	getLineWidth: 1,
})

export default generateClorLayer
