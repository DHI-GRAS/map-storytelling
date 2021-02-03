

import { GeoJsonLayer } from '@deck.gl/layers';

const generateMarkerLayer = (
	id: string,
	data: any,
	visible: boolean = true,
	lineColor: any = [ 151, 219, 249, 255],
	isFill = false,
	fillColor: [number, number, number, number] = [134, 162, 179, 150]
	): GeoJsonLayer<any> => {
	return new GeoJsonLayer({
			id: id,
			data: data,
			pickable: false,
			visible: visible,
			stroked: true,
			filled: isFill,
			extruded: false,
			// lineWidthScale: 20,
			lineWidthMinPixels: 4,
			getFillColor: fillColor,
			getLineColor: lineColor,
			// getRadius: 100,
			getLineWidth: 1,
			// getElevation: 30
		});
}

	export default generateMarkerLayer;
