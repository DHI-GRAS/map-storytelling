import denmarkGeoJSon from 'common/data/geojson/Denmark.json'
import herningJson from 'common/data/geojson/herning.json'
import forestClor from 'common/data/geojson/forest_cloropleth.json'
import blockTreesJson from 'common/data/vector-files/block_trees.json'
import blockTreesFences from 'common/data/vector-files/block_trees_fences.json'
import blockTreesGroups from 'common/data/vector-files/block_trees_groups.json'
import blockTreesForest from 'common/data/vector-files/block_trees_forest.json'
import blockBuildings from 'common/data/vector-files/buildings.json'

import { GeoJsonConfig, RasterConfig, MarkersConfig } from './@types/layersConfig'
import Config from './@types/Config'

const allMarkers: MarkersConfig = 	{
	id: 'all-markers-forest-national-scale-layer',
	visible: true,
	type: 'marker',
	data:
	[
		{
			coordinates: [ 10.165798, 55.513295 ],
			name: 'National forest mapping',
		},
		{
			coordinates: [ 12.321831, 56.002167 ],
			name: 'Coniferous layer',
		},
		{
			coordinates: [ 11.931931451403903, 54.575430797189625 ],
			name: 'A: The sand dune that disappeared',
		},
		{
			coordinates: [ 9.81878839989416, 54.904766036118524 ],
			name: 'C: The city filled with tiny and dynamic objects',
		},
		{
			coordinates: [ 10.19916535101355, 55.10831373009 ],
			name: 'D: The country side',
		},
		{
			coordinates: [ 10.21482134128163, 55.10815610067341 ],
			name: 'E: The country side',
		},
		{
			coordinates: [ 10.20881828631708, 57.47134378201429 ],
			name: 'F: The country side',
		},
	],
}

const animationMarkers: MarkersConfig = {
	id: 'animation',
	visible: true,
	animation: true,
	type: 'marker',
	data:
	[
		{
			coordinates: [ 9.070115, 56.259095 ],
			id: 'animation-marker-1',
		},
		{
			coordinates: [ 12.239054, 55.290043 ],
			id: 'animation-marker-10',
		},
		{
			coordinates: [ 10.342586, 55.263648 ],
			id: 'animation-marker-2',
		},
		{
			coordinates: [ 10.664022, 56.372447 ],
			id: 'animation-marker-11',
		},
		{
			coordinates: [ 9.376268, 56.897888 ],
			id: 'animation-marker-3',
		},
		{
			coordinates: [ 9.099412, 55.025235 ],
			id: 'animation-marker-8',
		},
		{
			coordinates: [ 8.367245, 56.406546 ],
			id: 'animation-marker-4',
		},
		{
			coordinates: [ 12.515967, 55.687448 ],
			id: 'animation-marker-9',
		},
		{
			coordinates: [ 11.295075, 54.783467 ],
			id: 'animation-marker-5',
		},
		{
			coordinates: [ 11.974892, 54.831080 ],
			id: 'animation-marker-6',
		},
		{
			coordinates: [ 11.490710, 55.741779 ],
			id: 'animation-marker-7',
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const layersAnimation: RasterConfig = {
	id: 'layers-animation',
	type: 'raster',
	animation: true,
	visible: true,
	rasters: [
		{
			id: 'layers-animation-animation-1',
			type: 'raster',
			url: [ 'https://ix8zgaqqe1.execute-api.eu-central-1.amazonaws.com/production/rgb/composite/20180501/1/{z}/{x}/{y}.png?r=B04&g=B03&b=B02&r_range=[0,2000]&b_range=[0,2000]&g_range=[0,2000]' ],
		},
		{
			id: 'layers-animation-animation-2',
			type: 'raster',
			url: [ 'https://ix8zgaqqe1.execute-api.eu-central-1.amazonaws.com/production/singleband/index/20180716/1/ndvi/{z}/{x}/{y}.png?stretch_range=[0,10000]&colormap=rdylgn' ],
		},
		{
			id: 'layers-animation-animation-3',
			type: 'raster',
			url: [ 'https://ix8zgaqqe1.execute-api.eu-central-1.amazonaws.com/production/rgb/reflectance/20180716/1/{z}/{x}/{y}.png?r=B08&g=B03&b=B02&r_range=%5B0,10000%5D&g_range=%5B0,3000%5D&b_range=%5B0,3000%5D' ],
		},
	],
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

const herningMun: GeoJsonConfig = {
	id: 'herning-municipality',
	visible: true,
	data: herningJson,
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

const intensityLayer: RasterConfig = {
	id: 'intensity-layer',
	type: 'raster',
	visible: true,
	url: [ 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/intensity-area01-2018/2018/intensity/{z}/{x}/{y}.png?colormap=gray' ],
}

const ndsmLayer: RasterConfig = {
	id: 'ndsm-layer',
	type: 'raster',
	visible: true,
	url: [ 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/ndsm-area01-2018/2018/ndsm/{z}/{x}/{y}.png?colormap=gray' ],
}

const vectorBlockTrees: GeoJsonConfig = {
	id: 'vector-block-trees',
	type: 'geojson',
	data: blockTreesJson,
	fill: true,
	fillColor: [ 171, 139, 229, 200 ],
	lineColor: [ 155, 155, 155, 0 ],
	visible: true,
}

const vectorBlockTreesFences: GeoJsonConfig = {
	id: 'vector-block-trees-fences',
	type: 'geojson',
	data: blockTreesFences,
	fill: true,
	visible: true,
	fillColor: [ 11, 229, 34, 200 ],
	lineColor: [ 11, 229, 34, 100 ],
}

const vectorBlockTreesForest: GeoJsonConfig = {
	id: 'vector-block-trees-forest',
	type: 'geojson',
	data: blockTreesForest,
	fill: true,
	visible: true,
	fillColor: [ 125, 76, 5, 200 ],
	lineColor: [ 155, 155, 155, 0 ],
}

const vectorBlockTreesGroups: GeoJsonConfig = {
	id: 'vector-block-trees-groups',
	type: 'geojson',
	visible: true,
	data: blockTreesGroups,
	fill: true,
	fillColor: [ 252, 229, 21, 200 ],
	lineColor: [ 155, 155, 155, 0 ],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vectorBlockBuildings: GeoJsonConfig = {
	id: 'vector-block-buildings',
	type: 'geojson',
	data: blockBuildings,
	fill: true,
	visible: true,
	fillColor: [ 13, 109, 39, 200 ],
	lineColor: [ 155, 155, 155, 0 ],
}

const config: Config = {
	style: 'mapbox://styles/mapbox/satellite-v9',
	chapters: [
		{
			id: 'denmark-layer',
			alignmentX: 'flex-start',
			alignmentY: 'center',
			title: 'Det grønne dynamiske Danmarkskort',
			description: 'Genvejen til et opdateret og tidsligt overblik over det Grønne Danmark',
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
			title: 'Opdaterede nationale skovkort',
			description: 'Sammenhængende og tidslig referenceramme for udviklingen af skovdække i Danmark',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 60,
				bearing: -20,
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
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'Kvadratmeter skov per indbygger i 2020',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 60,
				bearing: 10,
			},
			onChapterEnter: [
				{
					...denmarkCountryBorder,
					visible: false,
				},
				{
					...munClorLayer,
					visible: true,
					opacity: 1,
				},
				{
					...allMarkers,
					visible: false,
				},
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
			],
		},
		{
			id: 'herning-commune',
			alignmentX: 'left',
			alignmentY: 'flex-start',
			title: 'Skovdække i Herning kommune',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 60,
				bearing: 10,
			},
			onChapterEnter: [
				{
					...munClorLayerOpacity,
					visible: true,
					extruded: false,
					opacity: 1,
				},
				{
					...herningMun,
					visible: true,
				},

			],
			onChapterExit: [

				{
					...herningMun,
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
			title: 'Hvordan ser diversiteten af skov ud?',
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
				{ ...allMarkers, visible: false },
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
			id: 'markers-overview',
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 6,
				pitch: 60,
				bearing: 0,
			},
			onChapterEnter: [ allMarkers, denmarkCountryBorder ],
			onChapterExit: [
				{
					...denmarkCountryBorder,
					visible: false,
				},
			],
		},
		{
			id: 'multi-coniferous-class',
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'Skov til skov – træ til træ',
			description: 'Kortlægning af træarter og antal i de danske skove',
			location: {
				center: [ 12.325160, 55.981134 ],
				zoom: 12,
				pitch: 60,
				bearing: -10,
			},
			onChapterEnter: [
				multipleConifers,
				{
					...intensityLayer,
					visible: false,
				},
				{
					...ndsmLayer,
					visible: false,
				},
				{
					...rasterArea01Optical,
					visible: false,
				},
			],
			onChapterExit: [
				{
					...multipleConifers,
					visible: false,
				},
			],
		},
		{
			id: 'intensity-layer',
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'LIDAR intensitet',
			location: {
				center: [ 11.931931451403903, 54.575430797189625 ],
				zoom: 15,
				pitch: 60,
				bearing: 0,
			},
			onChapterEnter: [
				intensityLayer,
				{
					...ndsmLayer,
					visible: false,
				},
				{
					...rasterArea01Optical,
					visible: false,
				},
			],
			onChapterExit: [],
		},
		{
			id: 'ndsm-layer',
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'nDSM',
			location: {
				center: [ 11.931931451403903, 54.575430797189625 ],
				zoom: 15,
				pitch: 60,
				bearing: 0,
			},
			onChapterEnter: [
				ndsmLayer,
				{
					...rasterArea01Optical,
					visible: false,
				},
			],
			onChapterExit: [],
		},
		{
			id: 'rgb-layer',
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'RGB/Orthophoto',
			location: {
				center: [ 11.931931451403903, 54.575430797189625 ],
				zoom: 15,
				pitch: 60,
				bearing: 0,
			},
			onChapterEnter: [
				rasterArea01Optical,
				{ ...vectorBlockTrees, visible: false },
				{ ...vectorBlockTreesForest, visible: false },
				{ ...vectorBlockTreesFences, visible: false },
				{ ...vectorBlockTreesGroups, visible: false },
			],
			onChapterExit: [],
		},
		{
			id: 'vector-data',
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'GEODK vektor',
			location: {
				center: [ 11.931931451403903, 54.575430797189625 ],
				zoom: 15,
				pitch: 60,
				bearing: 0,
			},
			onChapterEnter: [
				vectorBlockTrees,
				vectorBlockTreesForest,
				vectorBlockTreesFences,
				vectorBlockTreesGroups,
			],
			onChapterExit: [
				{ ...vectorBlockTrees, visible: false },
				{ ...vectorBlockTreesForest, visible: false },
				{ ...vectorBlockTreesFences, visible: false },
				{ ...vectorBlockTreesGroups, visible: false },
			],
		},
		{
			id: 'raster-forest-class',
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'Det dynamiske grønne Danmark i detaljer',
			description: 'Alle de små grønne objekter i vores byer og landdistrikter',
			location: {
				center: [ 11.931931451403903, 54.575430797189625 ],
				zoom: 15,
				pitch: 0,
				bearing: 0,
			},
			onChapterEnter: [
				rasterForestClass01,
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
			],
		},
		{
			id: 'final-step',
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 60,
				bearing: 10,
			},
			onChapterEnter: [
				denmarkCountryBorder,
				{
					...allMarkers,
					visible: false,
				},
				{
					...rasterForestClass01,
					visible: false,
				},
				animationMarkers,
			],
			onChapterExit: [
				{
					...animationMarkers, visible: false,
				},
			],
		},
	],
}

export default config
