import {
	GeoJsonConfig, RasterConfig, MarkersConfig, TextMarkerConfig,
} from './layersConfig'

type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'space-between'

type Location = {
	center: [number, number],
	zoom: number,
	pitch: number,
	bearing: number,
}

type LayersConfig = GeoJsonConfig | RasterConfig | MarkersConfig | TextMarkerConfig

export interface Chapter {
	id: string,
	alignmentX: FlexAlign,
	alignmentY: FlexAlign,
	title?: string,
	description?: string,
	location: Location,
	onChapterEnter: LayersConfig[],
	onChapterExit: LayersConfig[],
}

export default interface Config {
	style: string,
	chapters: Chapter[],
}
