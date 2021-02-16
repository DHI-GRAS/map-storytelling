import denmarkGeoJSon from 'common/data/geojson/Denmark.json'
import aarhusJson from 'common/data/geojson/Aarhus.json'
import forestClor from 'common/data/geojson/forest_cloropleth.json'
import blockTreesJson from 'common/data/vector-files/block_trees.json'
import blockTreesFences from 'common/data/vector-files/block_trees_fences.json'
import blockTreesGroups from 'common/data/vector-files/block_trees_groups.json'
import blockTreesForest from 'common/data/vector-files/block_trees_forest.json'

import {
	GeoJsonConfig, RasterConfig, MarkersConfig, TextMarkerConfig,
} from './@types/layersConfig'
import Config from './@types/Config'

const allMarkers: MarkersConfig = 	{
	id: 'all-mark-lr',
	visible: true,
	type: 'marker',
	data:
	[
		{
			coordinates: [ 10.165798, 55.513295 ],
			id: 'all-mark-lr-marker-l-1',
		},
		{
			coordinates: [ 12.321831, 56.002167 ],
			id: 'all-mark-lr-marker-l-2',

		},
		{
			coordinates: [ 11.931931451403903, 54.575430797189625 ],
			id: 'all-mark-lr-marker-l-3',

		},
		{
			coordinates: [ 9.81878839989416, 54.904766036118524 ],
			id: 'all-mark-lr-marker-l-4',

		},
		{
			coordinates: [ 10.19916535101355, 55.10831373009 ],
			id: 'all-mark-lr-marker-l-5',

		},
		{
			coordinates: [ 10.21482134128163, 55.10815610067341 ],
			id: 'all-mark-lr-marker-l-6',

		},
		{
			coordinates: [ 10.20881828631708, 57.47134378201429 ],
			id: 'all-mark-lr-marker-l-7',

		},
	],
}


const denmarkCountryBorder: GeoJsonConfig = {
	id: 'denmark-country-border',
	type: 'geojson',
	data: denmarkGeoJSon,
	fill: false,
	visible: true,
}


const rasterArea01Optical: RasterConfig = {
	id: 'raster-01-layer-optical',
	visible: true,
	type: 'raster',
	url: [ 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/rgb/sdfe-hack/summer-2018-area01/2018/{z}/{x}/{y}.png?r=red&g=green&b=blue&r_range=[0,255]&b_range=[0,255]&g_range=[0,255]' ],
}

const rasterForestClass01: RasterConfig = {
	id: 'raster-forest-national-scale-layer',
	visible: true,
	type: 'raster',
	opacity: 0.3,
	url: [ `https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area01/2018/class/{z}/{x}/{y}.png?colormap=explicit&explicit_color_map=${encodeURIComponent(
		JSON.stringify({ 0: '#FFFFFF', 1: '##C80815' })
	)}` ],
}

const rasterNationalForestCover: RasterConfig = {
	id: 'raster-forest-national-scale-layer-cover',
	visible: true,
	type: 'raster',
	opacity: 1,
	url: [ `https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/forest-2class-s2-2020/2020/forest/{z}/{x}/{y}.png?colormap=explicit&explicit_color_map=${encodeURIComponent(
		JSON.stringify({ 0: '#FFFFFF', 1: '#22EE5B' })
	)}` ],
}

const rasterNationalForestClass: RasterConfig = {
	id: 'raster-forest-national-scale-layer-class',
	visible: true,
	type: 'raster',
	opacity: 1,
	url: [ `https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/forest-2class-s2-2020/2020/forest/{z}/{x}/{y}.png?colormap=explicit&explicit_color_map=${encodeURIComponent(
		JSON.stringify({ 0: '#FFFFFF', 1: '#FFFF00', 2: '#0D6D27' })
	)}` ],
}
const munClorLayer: GeoJsonConfig = {
	id: 'communes-cloropeth-layer',
	visible: true,
	data: forestClor,
	type: 'geojson',
}

const munClorLayerOpacity: GeoJsonConfig = {
	id: 'communes-cloropeth-layer-opacity',
	visible: true,
	data: forestClor,
	type: 'geojson',
}

const munClorTextMarkersWElevation: TextMarkerConfig = {
	id: 'kommunes-cloropeth-layer-text-markers',
	type: 'text-marker',
	visible: true,
	data: [
		{
			coordinates: [ 11.301177005104158, 54.800326681009686 ],
			text: '1922 m2',
			elevation: 40,
		},
		{
			coordinates: [ 10.38272252111249, 55.406670975795244 ],
			text: '186 m2',
			elevation: 30,
		},
		{
			coordinates: [ 8.541002238341152, 56.00909287197142 ],
			text: '4094 m2',
			elevation: 60,
		},
		{
			coordinates: [ 11.128741396470142, 57.292776066803675 ],
			text: '24019 m2',
			elevation: 240,
		},
	],
}


const aarhusMun: GeoJsonConfig = {
	id: 'aarhus-municipality',
	visible: true,
	data: aarhusJson,
	type: 'geojson',
}

const multipleConifers: RasterConfig = {
	id: 'multiple-coniferuous',
	type: 'raster',
	visible: true,
	opacity: 0.5,
	url: [ `https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/forest-species/2020/forest/{z}/{x}/{y}.png?colormap=explicit&explicit_color_map=${encodeURIComponent(
		JSON.stringify({
			1: '#0D6D27', 2: '#FFFF00', 3: '#22EE5B', 4: '#7D4C05', 5: '#FF8A00', 6: '#FFFFFF',
		})
	)}` ],
}

const vectorBlockTrees: GeoJsonConfig = {
	id: 'layers-animation-vector-block-trees',
	type: 'geojson',
	data: blockTreesJson,
	fill: true,
	fillColor: [ 171, 139, 229, 200 ],
	lineColor: [ 155, 155, 155, 0 ],
	visible: true,
}

const vectorBlockTreesFences: GeoJsonConfig = {
	id: 'layers-animation-vector-block-trees-fences',
	type: 'geojson',
	data: blockTreesFences,
	fill: true,
	visible: true,
	fillColor: [ 11, 229, 34, 200 ],
	lineColor: [ 11, 229, 34, 100 ],
}

const vectorBlockTreesForest: GeoJsonConfig = {
	id: 'layers-animation-vector-block-trees-forest',
	type: 'geojson',
	data: blockTreesForest,
	fill: true,
	visible: true,
	fillColor: [ 125, 76, 5, 200 ],
	lineColor: [ 155, 155, 155, 0 ],
}

const vectorBlockTreesGroups: GeoJsonConfig = {
	id: 'layers-animation-vector-block-trees-groups',
	type: 'geojson',
	visible: true,
	data: blockTreesGroups,
	fill: true,
	fillColor: [ 252, 229, 21, 200 ],
	lineColor: [ 155, 155, 155, 0 ],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const layersAnimation: RasterConfig = {
	id: 'layers-animation',
	type: 'raster',
	animation: true,
	visible: true,
	rasters: [
		{
			id: 'layers-animation-animation-intensity',
			type: 'raster',
			url: [ 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/intensity-area01-2018/2018/intensity/{z}/{x}/{y}.png?colormap=gray' ],
		},
		{
			id: 'layers-animation-animation-ndsm',
			type: 'raster',
			url: [ 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/ndsm-area01-2018/2018/ndsm/{z}/{x}/{y}.png?colormap=gray' ],
		},
		{
			id: 'layers-animation-animation-ortho',
			type: 'raster',
			url: [ 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/rgb/sdfe-hack/summer-2018-area01/2018/{z}/{x}/{y}.png?r=red&g=green&b=blue&r_range=[0,255]&b_range=[0,255]&g_range=[0,255]' ],
		},
		{
			id: 'layers-animation-vector-data',
			type: 'geojson',
			data: [
				vectorBlockTrees,
				vectorBlockTreesForest,
				vectorBlockTreesFences,
				vectorBlockTreesGroups,
			],
		},
		{
			id: 'layers-animation-class',
			type: 'raster',
			opacity: 0.3,
			url: [ `https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area01/2018/class/{z}/{x}/{y}.png?colormap=explicit&explicit_color_map=${encodeURIComponent(
				JSON.stringify({ 0: '#FFFFFF', 1: '##C80815' })
			)}` ],
		},
	],
}

const dynamicDenmarkTextLayer: TextMarkerConfig = {
	id: 'dynamic-denmark-text-markers',
	type: 'text-marker',
	visible: true,
	data: [
		{
			coordinates: [ 11.933548, 54.571394 ],
			text: 'Bush (44 m2)',
			elevation: 15,
		},
		{
			coordinates: [ 11.927557258594852, 54.57517030609876 ],
			text: 'Tree',
			elevation: 15,
		},
		{
			coordinates: [ 11.935743873500781, 54.57456663684158 ],
			text: 'Treecover (4500 m2)',
			elevation: 15,
		},
		{
			coordinates: [ 11.936925434520964, 54.57612109905895 ],
			text: 'Shrub (10 m2)',
			elevation: 15,
		},
		{
			coordinates: [ 11.930084484129145, 54.579231054593606 ],
			text: 'Hedgerow (105 m2)',
			elevation: 15,
		},
	],
}

const animationTextMarkersDK: TextMarkerConfig = {
	id: 'animation',
	visible: true,
	animation: true,
	type: 'text-marker',
	data:
	[
		{
			coordinates: [ 9.114974, 55.208999 ],
			text: '31 solar cells',
		},
		{
			coordinates: [ 8.279515, 55.810075 ],
			text: 'Rosa rugosa (200 m2)',
		},
		{
			coordinates: [ 9.793778, 56.895737 ],
			text: '10 rooftop windows',
		},
		{
			coordinates: [ 10.398180, 55.399694 ],
			text: '50 empty parking spots',
		},
		{
			coordinates: [ 10.734806, 56.197880 ],
			text: 'Coastal erosion (50 cm)',
		},
		{
			coordinates: [ 11.728074, 54.663481 ],
			text: 'Flooded area',
		},
		{
			coordinates: [ 12.293662, 55.768230 ],
			text: 'A broken street light pole',
		},
	],
}


const config: Config = {
	style: 'mapbox://styles/mapbox/satellite-v9',
	chapters: [
		{
			id: 'denmark-layer',
			alignmentX: 'flex-start',
			alignmentY: 'center',
			// title: 'Det grønne dynamiske Danmarkskort',
			// description: 'Genvejen til et opdateret og tidsligt overblik over det Grønne Danmark',
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
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'Updated national forest map',
			description: 'Up to date national forest map from 2020',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 40,
				bearing: -10,
			},
			onChapterEnter: [
				{
					...denmarkCountryBorder, fill: true, lineColor: [ 255, 255, 255, 0 ], fillColor: [ 134, 162, 179, 100 ],
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
			alignmentX: 'space-between',
			alignmentY: 'flex-start',
			title: 'Square Meter (m2) forest per inhabitant by municipality in 2020',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
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
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'Forest cover in Aarhus municipality',
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
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'How is the diversity of forest looking?',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 60,
				bearing: 10,
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
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'When further details are needed',
			description: 'Mapping of individual tree species',
			location: {
				center: [ 12.325160, 55.981134 ],
				zoom: 12,
				pitch: 60,
				bearing: -10,
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
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'The dynamic green Denmark in even greater details',
			description: 'All the small green objects in our cities and rural areas',
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
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'The dynamic green Denmark in even greater details',
			description: 'All the small green objects in our cities and rural areas',
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
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'Imagine the potential of intelligent and automated mapping solutions to map and monitor landscape dynamics at scale',
			description: 'With novel AI technology and earth observation data, this is the reality of today.',
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
