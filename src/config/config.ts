import ContentStory0 from 'story-components/ContentStory0'
import ContentStory1 from 'story-components/ContentStory1'
import ContentStory3 from 'story-components/ContentStory3'
import ContentStory7 from 'story-components/ContentStory7'
import legendForest2Class from 'common/data/legendForest2Class'
import legendForest6Class from 'common/data/legendForest6Class'
import Footer from 'story/Footer'
import ScrollAnimation from 'scroll/ScrollAnimation'
import {
	textSlide2Info,
	textSlide4Info,
	textSlide5Info,
} from './infoText'
import {
	allMarkers,
	denmarkCountryBorder,
	rasterArea01Optical,
	rasterForestClass01,
	rasterNationalForestCover,
	rasterNationalForestClass,
	munClorLayer,
	munClorLayerOpacity,
	munClorTextMarkersWElevation,
	aarhusMun,
	multipleConifers,
	layersAnimation,
	dynamicDenmarkTextLayer,
	animationTextMarkersDK,
} from './configLayers'
import Config from './types/Config'

const config: Config = {
	style: 'mapbox://styles/mapbox/satellite-v9',
	footer: {
		type: 'component',
		component: Footer,
	},
	scrollIndicator: {
		type: 'basic',
		text: 'You can navigate through the story by scrolling with your mouse or using the up and down keys on your keyboard',
	},
	chapters: [
		{
			id: 'denmark-layer',
			content: {
				type: 'component',
				component: ContentStory0,
			},
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 6,
				pitch: 60,
				bearing: 0,
			},
			onChapterEnter: [
				{
					...denmarkCountryBorder,
					visible: false,
				},
				{
					...allMarkers,
					visible: false,
				},
				{
					...munClorLayer,
					visible: false,
				},
			],
			onChapterExit: [],
		},
		{
			id: 'forest-national-scale-layer',
			content: {
				type: 'component',
				component: ContentStory1,
			},
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 6.8,
				pitch: 40,
				bearing: -10,
			},
			onChapterEnter: [
				{
					...denmarkCountryBorder,
					fill: true,
					lineColor: [ 255, 255, 255, 0 ],
					fillColor: [ 134, 162, 179, 100 ],
				},
				rasterNationalForestCover,
			],
			onChapterExit: [
				{
					...rasterNationalForestCover,
					visible: false,
				},
				{
					...denmarkCountryBorder, visible: false,
				},
			],
		},
		{
			id: 'forest-national-scale-layer-2',
			content: {
				type: 'basic',
				title: 'Square Meter (m2) forest per inhabitant by municipality in 2020',
				alignmentX: 'space-between',
				alignmentY: 'flex-start',
				info: textSlide2Info,
			},
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 6.7,
				pitch: 60,
				bearing: 10,
			},
			onChapterEnter: [
				{
					...munClorLayer,
					visible: true,
					opacity: 1,
				},
				{
					...allMarkers,
					visible: false,
				},
				munClorTextMarkersWElevation,
			],
			onChapterExit: [
				{
					...munClorLayer,
					visible: false,
				},
				{
					...rasterNationalForestClass,
					visible: false,
				},
				{
					...munClorTextMarkersWElevation,
					visible: false,
				},
			],
		},
		{
			id: 'aarhus-commune',
			content: {
				type: 'component',
				component: ContentStory3,
			},
			location: {
				center: [ 10.205449, 56.131740 ],
				zoom: 9,
				pitch: 40,
				bearing: -30,
			},
			onChapterEnter: [
				{
					...munClorLayerOpacity,
					visible: true,
					extruded: false,
					opacity: 1,
				},
				{
					...aarhusMun,
					visible: true,
				},

			],
			onChapterExit: [

				{
					...aarhusMun,
					visible: false,
				},
				{
					...munClorLayerOpacity,
					visible: false,
				},
			],
		},
		{
			id: 'raster-national-forest-class',
			content: {
				type: 'basic',
				title: 'How is the diversity of forest looking?',
				alignmentX: 'flex-start',
				alignmentY: 'flex-start',
				info: textSlide4Info,
			},
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 60,
				bearing: 10,
			},
			legend: {
				items: legendForest2Class,
			},
			onChapterEnter: [
				{
					...denmarkCountryBorder, fill: true, lineColor: [ 255, 255, 255, 0 ], fillColor: [ 134, 162, 179, 100 ],
				},
				rasterNationalForestClass,
			],
			onChapterExit: [
				{
					...denmarkCountryBorder,
					visible: false,
				},
				{
					...rasterNationalForestClass,
					visible: false,
				},
			],
		},
		{
			id: 'multi-coniferous-class',
			content: {
				type: 'basic',
				title: 'When further details are needed',
				description: 'Mapping individual tree species',
				alignmentX: 'flex-start',
				alignmentY: 'flex-start',
				info: textSlide5Info,
			},
			location: {
				center: [ 12.325160, 55.981134 ],
				zoom: 12,
				pitch: 60,
				bearing: -10,
			},
			legend: {
				items: legendForest6Class,
			},
			onChapterEnter: [
				multipleConifers,

			],
			onChapterExit: [
				{
					...multipleConifers,
					visible: false,
				},
			],
		},
		{
			id: 'animation-raster-layer',
			content: {
				type: 'basic',
				title: 'The dynamic green Denmark in even greater details',
				description: 'All the small green objects in our cities and rural areas',
				alignmentX: 'flex-start',
				alignmentY: 'flex-start',
			},
			location: {
				center: [ 11.931931451403903, 54.575430797189625 ],
				zoom: 15,
				pitch: 60,
				bearing: 0,
			},
			onChapterEnter: [
				layersAnimation,
			],
			onChapterExit: [
				{
					...layersAnimation,
					visible: false,
				},
			],
		},
		{
			id: 'raster-forest-class',
			content: {
				type: 'component',
				component: ContentStory7,
			},
			location: {
				center: [ 11.931931451403903, 54.575430797189625 ],
				zoom: 14.5,
				pitch: 0,
				bearing: 0,
			},
			onChapterEnter: [
				rasterArea01Optical,
				rasterForestClass01,
				dynamicDenmarkTextLayer,
				{
					...denmarkCountryBorder,
					visible: false,
				},
			],
			onChapterExit: [
				{
					...rasterForestClass01,
					visible: false,
				},
				{
					...rasterArea01Optical,
					visible: false,
				},
				{
					...dynamicDenmarkTextLayer,
					visible: false,
				},
			],
		},
		{
			id: 'final-step',
			content: {
				type: 'basic',
				title: 'Imagine the potential of intelligent and automated mapping solutions to map and monitor landscape dynamics at scale',
				description: 'With novel AI technology and earth observation data, this is the reality of today.',
				alignmentX: 'flex-start',
				alignmentY: 'flex-start',
			},
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 60,
				bearing: 10,
			},
			onChapterEnter: [
				denmarkCountryBorder,
				animationTextMarkersDK,
			],
			onChapterExit: [
				{
					...animationTextMarkersDK, visible: false,
				},
			],
		},
	],
}

export default config
