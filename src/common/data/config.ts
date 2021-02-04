import denmarkGeoJSon from './Denmark.json'
import herningJson from './Herning.json'

const allMarkers = 	{
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
			coordinates: [ 11.931931451403903, 54.575430797189625 ],
			name: 'A: The sand dune that disappeared',
		},
		{
			coordinates: [ 11.947387726660498, 54.57506135095206 ],
			name: 'B: Dynamic danish landscape',
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

const denmarkCountryBorder = {
	id: 'denmark-country-border',
	type: 'geojson',
	data: denmarkGeoJSon,
	fill: false,
	visible: true,
}

const layersAnimation = {
	id: 'layers-animation',
	type: 'raster',
	animation: true,
	visible: true,
	timeout: 2,
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

const rasterForestOptical01 = {
	id: 'raster-forest-national-scale-layer-optical',
	visible: true,
	type: 'raster',
	url: [ 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/rgb/sdfe-hack/summer-2018-area01/2018/{z}/{x}/{y}.png?r=red&g=green&b=blue&r_range=[0,255]&b_range=[0,255]&g_range=[0,255]' ],
}

const rasterForestClass01 = {
	id: 'raster-forest-national-scale-layer',
	visible: true,
	type: 'raster',
	opacity: 0.3,
	url: [ `https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area01/2018/class/{z}/{x}/{y}.png?colormap=explicit&explicit_color_map=${encodeURIComponent(
		JSON.stringify({ 0: '#FFFFFF', 1: '##C80815' })
	)}` ],
}

const rasterNationalForestCover = {
	id: 'raster-forest-national-scale-layer-cover',
	visible: true,
	type: 'raster',
	opacity: 0.3,
	url: [ `https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/forest-1class-s2-2020/2020/forest/{z}/{x}/{y}.png?colormap=explicit&explicit_color_map=${encodeURIComponent(
		JSON.stringify({ 0: '#FFFFFF', 1: '##C80815' })
	)}` ],
}

const rasterNationalForestClass = {
	id: 'raster-forest-national-scale-layer-class',
	visible: true,
	type: 'raster',
	opacity: 1,
	url: [ `https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/forest-2class-s2-2020/2020/forest/{z}/{x}/{y}.png?colormap=explicit&explicit_color_map=${encodeURIComponent(
		JSON.stringify({ 0: '#FFFFFF', 1: '#FFFF00', 2: '#0D6D27' })
	)}` ],
}
const munClorLayer = {
	id: 'communes-cloropeth-layer',
	visible: true,
	data: 'https://grasdatastorage.blob.core.windows.net/images/forest_cloropleth.json',
	type: 'geojson',
}

const munClorLayerOpacity = {
	id: 'communes-cloropeth-layer-opacity',
	visible: true,
	data: 'https://grasdatastorage.blob.core.windows.net/images/forest_cloropleth.json',
	type: 'geojson',
}

const herningMun = {
	id: 'herning-municipality',
	visible: true,
	data: herningJson,
	type: 'geojson',
}


const config = {
	style: 'mapbox://styles/mapbox/satellite-v9',
	footer: 'Source: source citations, etc.',
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
			callback: '',
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
				// add polygon with only denmark
			],
			onChapterExit: [],
		},
		{
			id: 'forest-national-scale-layer',
			alignmentX: 'right',
			alignmentY: 'flex-start',
			title: 'Opdaterede nationale skovkort',
			description: 'Sammenhængende og tidslig referenceramme for udviklingen af skovdække i Danmark',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 6,
				pitch: 60,
				bearing: 10,
			},
			callback: '',
			onChapterEnter: [
				denmarkCountryBorder,
				// rasterNationalForestCover,
			],
			onChapterExit: [
				// {
				// 	...rasterNationalForestCover,
				// 	visible: false,
				// },
				// {
				// 	...munClorLayer,
				// 	visible: false,
				// },
			],
		},
		{
			id: 'forest-national-scale-layer-2',
			alignmentX: 'flex-start',
			alignmentY: 'flex-start',
			title: 'Kvadratmeter skov per indbygger i 2020',
			// location: {
			// 	center: [ 10.165798, 55.513295 ],
			// 	zoom: 7,
			// 	pitch: 50,
			// 	bearing: -30,
			// },
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 60,
				bearing: 10,
			},
			callback: '',
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
				// rasterNationalForestClass,
				// denmarkCountryBorder,
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
			// description: 'The markers on denmark',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 7,
				pitch: 60,
				bearing: 10,
			},
			callback: '',
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
				// {
				// 	...denmarkCountryBorder,
				// 	visible: false,
				// },
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
			callback: '',
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
			alignmentX: 'left',
			alignmentY: 'flex-start',
			title: 'Markers on map',
			description: 'The markers on denmark',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 6,
				pitch: 60,
				bearing: 0,
			},
			callback: '',
			onChapterEnter: [ allMarkers, denmarkCountryBorder ],
			onChapterExit: [
				{
					...denmarkCountryBorder,
					visible: false,
				},
			],
		},
		{
			alignmentX: 'flex-start',
			alignmentY: 'center',
			title: 'A: The sand dune that disappeared',
			description: 'The sand dune that disappeared - uncovered by SDFE data. Animated tile',
			location: {
				center: [ 11.931931451403903, 54.575430797189625 ],
				zoom: 10,
				pitch: 60,
				bearing: 0,
			},
			callback: '',
			onChapterEnter: [
				// main layer id defines how do the rasters id's start
				{
					...denmarkCountryBorder,
					visible: false,
				},
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
			alignmentX: 'flex-end',
			alignmentY: 'flex-end',
			title: 'B: Dynamic danish landscape',
			// image: './path/to/image/source.png',
			description:
        'Tracking and monitoring small landscape features and invasive species in the dynamic Danish landscape',
			location: {
				center: [ 11.931931451403903, 54.575430797189625 ],
				zoom: 16,
				pitch: 0,
				bearing: 0,
			},
			callback: '',
			onChapterEnter: [
				rasterForestOptical01,
				rasterForestClass01,
			],
			onChapterExit: [
				{
					...rasterForestOptical01,
					visible: false,
				},
				{
					...rasterForestClass01,
					visible: false,
				},
			],
		},
		// {
		//   alignment: 'left',
		//   title: 'The dynamic evolving city',
		//   // image: './path/to/image/source.png',
		//   description: 'The dynamic evolving city',
		//   location: {
		//     center: [10.1788330078125, 56.18225387824831],
		//     zoom: 14,
		//     pitch: 60,
		//     bearing: -43.2,
		//   },
		//   callback: '',
		//   onChapterEnter: [],
		//   onChapterExit: [],
		// },
		{
			alignmentX: 'flex-end',
			alignmentY: 'center',
			hidden: false,
			title: 'C: The city filled with tiny and dynamic objects',
			// image: './path/to/image/source.png',
			description: 'The city filled with tiny and dynamic objects',
			location: {
				center: [ 9.81878839989416, 54.904766036118524 ],
				zoom: 16,
				pitch: 60,
				bearing: -43.2,
			},
			callback: '',
			onChapterEnter: [],
			onChapterExit: [],
		},
		{
			alignmentX: 'flex-start',
			alignmentY: 'center',
			hidden: false,
			title: 'D: The country side',
			// image: './path/to/image/source.png',
			description: 'The country side with all its small landscape features',
			location: {
				center: [ 10.19916535101355, 55.10831373009 ],
				zoom: 12,
				pitch: 80,
				bearing: -43.2,
			},
			callback: '',
			onChapterEnter: [],
			onChapterExit: [],
		},
		{
			alignmentX: 'flex-start',
			alignmentY: 'center',
			hidden: false,
			title: 'E: The country side',
			// image: './path/to/image/source.png',
			description: 'The country side with all its small landscape features',
			location: {
				center: [ 10.21482134128163, 55.10815610067341 ],
				zoom: 10,
				pitch: 90,
				bearing: 0,
			},
			callback: '',
			onChapterEnter: [],
			onChapterExit: [],
		},
		{
			alignmentX: 'flex-start',
			alignmentY: 'center',
			hidden: false,
			title: 'F: The country side',
			// image: './path/to/image/source.png',
			description: 'The country side with all its small landscape features',
			location: {
				center: [ 10.20881828631708, 57.47134378201429 ],
				zoom: 13,
				pitch: 60,
				bearing: 90,
			},
			callback: '',
			onChapterEnter: [],
			onChapterExit: [],
		},
	],
}

export default config
