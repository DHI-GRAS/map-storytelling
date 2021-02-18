export interface GeoJsonConfig {
	id: string,
	visible: boolean,
	data: any,
	type: 'geojson',
	extruded?: boolean,
	opacity?: number,
	lineColor?: [number, number, number, number],
	fill?: boolean,
	fillColor?: [number, number, number, number],
}

type RasterAnimation = {
	id: string,
	type: 'raster',
	url: string[],
	opacity?: number,
}

type RasterGeojsonAnimation = {
	id: string,
	type: 'geojson',
	data: GeoJsonConfig[],
}

export interface RasterConfig {
	id: string,
	visible: boolean,
	type: 'raster',
	// animation === true ? rasters key : url key
	opacity?: number,
	animation?: boolean,
	url?: string[],
	rasters?: (RasterAnimation | RasterGeojsonAnimation)[],
}

type MarkerItem = {
	coordinates: [number, number],
	id: string,
}

export interface MarkersConfig {
	id: string,
	visible: boolean,
	type: 'marker',
	animation?: boolean,
	data: MarkerItem[],
}

type TextMarkerItem = {
	coordinates: [number, number],
	text: string,
	elevation?: number,
}

export interface TextMarkerConfig {
	id: string,
	visible: boolean,
	type: 'text-marker',
	animation?: boolean,
	data: TextMarkerItem[],
}
