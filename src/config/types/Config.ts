import { FunctionComponent } from 'react'
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

export type LayersConfig = GeoJsonConfig | RasterConfig | MarkersConfig | TextMarkerConfig

interface BasicContent {
	type: 'basic',
	title?: string,
	description?: string,
	alignmentX?: FlexAlign,
	alignmentY?: FlexAlign,
	info?: string[],
}

interface ComponentContent {
	type: 'component',
	component: FunctionComponent | null,
}

export interface Chapter {
	id: string,
	content?: ComponentContent | BasicContent,
	location: Location,
	onChapterEnter: LayersConfig[],
	onChapterExit: LayersConfig[],
}

export default interface Config {
	style: string,
	chapters: Chapter[],
}
