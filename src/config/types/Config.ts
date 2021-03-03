import Component from '@deck.gl/core/lifecycle/component'
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

type LegendItem = { name: string; color: string }

interface Legend {
	title?: string,
	unit?: string,
	items: LegendItem[],
}

interface FooterText {
	type: 'text',
	text: string,
}

interface FooterComponent {
	type: 'component',
	component: FunctionComponent,
}

interface ComponentScroll {
	type: 'component',
	component: FunctionComponent,
}

interface BasicScroll {
	type: 'basic',
	text: string,
}

export interface Chapter {
	id: string,
	content?: ComponentContent | BasicContent,
	legend?: Legend,
	location: Location,
	onChapterEnter: LayersConfig[],
	onChapterExit: LayersConfig[],
}

export default interface Config {
	style: string,
	footer?: FooterText | FooterComponent,
	scrollIndicator?: ComponentScroll | BasicScroll,
	chapters: Chapter[],
}
