export interface GeoJsonConfig {
	id: string,
	visible: boolean,
	data: any,
	type: 'geojson',
	lineColor?: [number, number, number, number],
	fill?: boolean,
	fillColor?: [number, number, number, number],
}

type RasterAnimation = {
	id: string,
	type: 'raster',
	url: string[],
}

export interface RasterConfig {
	id: string,
	visible: boolean,
	type: 'raster',
	// animation === true ? rasters key : url key
	opacity?: number,
	animation?: boolean,
	url?: string[],
	rasters?: RasterAnimation[],
}

type MarkerItem = {
	coordinates: [number, number],
	id: string,
}

export interface MarkersConfig {
	id: string,
	visible: boolean,
	type: 'marker',
	animation: boolean,
	data: MarkerItem[],
}
