import { GeoJsonLayer } from '@deck.gl/layers'

const generateMarkerLayer = (
	id: string,
	data: any,
	visible = true,
	lineColor: any = [ 151, 219, 249, 255 ],
	isFill = false,
	fillColor: [number, number, number, number] = [ 134, 162, 179, 150 ]
): GeoJsonLayer<any> => new GeoJsonLayer({
	id,
	data,
	pickable: false,
	visible,
	stroked: true,
	filled: isFill,
	extruded: false,
	// lineWidthScale: 20,
	lineWidthMinPixels: 2,
	getFillColor: fillColor,
	getLineColor: lineColor,
	// getRadius: 100,
	getLineWidth: 0.5,
	// radiusScale: 10,
	getRadius: 8,
	// getElevation: 30
})

export default generateMarkerLayer
