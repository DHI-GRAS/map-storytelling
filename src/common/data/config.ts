import denmarkGeoJSon from './Denmark.json'

const config = {
	style: 'mapbox://styles/mapbox/satellite-v9',
	footer: 'Source: source citations, etc.',
	chapters: [
		{
			id: 'denmark-layer',
			alignmentX: 'flex-start',
			alignmentY: 'center',
			title: 'National title for denmark',
			description: 'the description',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 6,
				pitch: 60,
				bearing: 0,
			},
			callback: '',
			onChapterEnter: [
				{
					id: 'denmark-country-border',
					type: 'geojson',
					data: denmarkGeoJSon,
					fill: false,
					visible: true,
				},
				{
					id: 'all-markers-forest-national-scale-layer',
					visible: false,
					type: 'marker',
				},
				// add polygon with only denmark
			],
			onChapterExit: [],
		},
		{
			id: 'forest-national-scale-layer',
			alignmentX: 'right',
			alignmentY: 'flex-start',
			title: 'National forest mapping',
			description: 'National forest mapping',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 6,
				pitch: 60,
				bearing: 0,
			},
			callback: '',
			onChapterEnter: [
				{
					id: 'denmark-country-border',
					type: 'geojson',
					data: denmarkGeoJSon,
					fill: false,
					visible: true,
				},
			// 	// {
			// 	// 		id: 'raster-forest-national-scale-layer',
			// 	// 		visible: true,
			// 	// 		type: "raster",
			// 	// 		url: ['https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area01/2018/class/preview.png?colormap=reds',
			// 	// 		'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area02/2018/class/preview.png?colormap=reds',
			// 	// 		'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area03/2018/class/preview.png?colormap=reds',
			// 	// 		'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area04/2018/class/preview.png?colormap=reds',
			// 	// 		'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area05/2018/class/preview.png?colormap=reds',
			// 	// 		'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area06/2018/class/preview.png?colormap=reds'
			// 	// 	],
			// 	// }
			// {
			// 	id: 'forest-national-scale-layer',
			// 	visible: true,
			// 	type: "raster"
			// }
			],
			onChapterExit: [
			// {
			// 	id: 'forest-national-scale-layer',
			// 	visible: false,
			// 	type: "raster"
			// }
			],
		},
		{
			id: 'forest-national-scale-layer-2',
			alignmentX: 'flex-end',
			alignmentY: 'center',
			title: 'Classification of different trees',
			description: 'Classification of different trees on national scale',
			location: {
				center: [ 10.165798, 55.513295 ],
				zoom: 6,
				pitch: 60,
				bearing: 0,
			},
			callback: '',
			onChapterEnter: [
				// {
				// 	id: 'forest-national-scale-layer-2',
				// 	visible: true,
				// 	type: "raster"
				// }
				{
					id: 'denmark-country-border',
					type: 'geojson',
					data: denmarkGeoJSon,
					fill: false,
					visible: true,
				},
			],
			onChapterExit: [
				// {
				// 	id: 'forest-national-scale-layer-2',
				// 	visible: false,
				// 	type: "raster"
				// }

			],
		},
		{
			id: 'markers-overview',
			alignmentX: 'right',
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
			onChapterEnter: [
				{
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
						// {
						// 	coordinates: [ 11.947387726660498, 54.57506135095206 ],
						// 	name: 'B: Dynamic danish landscape',
						// },
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
				},
				// {
				// 		id: 'raster-forest-national-scale-layer',
				// 		visible: true,
				// 		type: "raster",
				// 		url: ['https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area01/2018/class/{z}/{x}/{y}.png?colormap=reds',
				// 		// 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area02/2018/class/preview.png?colormap=reds',
				// 		// 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area03/2018/class/preview.png?colormap=reds',
				// 		// 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area04/2018/class/preview.png?colormap=reds',
				// 		// 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area05/2018/class/preview.png?colormap=reds',
				// 		// 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area06/2018/class/preview.png?colormap=reds'
				// 	],
				// }
			],
			onChapterExit: [
				{
					id: 'denmark-country-border',
					type: 'geojson',
					data: denmarkGeoJSon,
					fill: false,
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
					id: 'layers-animation',
					type: 'raster',
					animation: true,
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
				},
			],
			onChapterExit: [
				{
					id: 'layers-animation',
					type: 'raster',
					animation: true,
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
				zoom: 14,
				pitch: 0,
				bearing: 0,
			},
			callback: '',
			onChapterEnter: [
				{
					id: 'raster-forest-national-scale-layer-optical',
					visible: true,
					type: 'raster',
					url: [ 'https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/rgb/sdfe-hack/summer-2018-area01/2018/{z}/{x}/{y}.png?r=red&g=green&b=blue&r_range=[0,2000]&b_range=[0,2000]&g_range=[0,2000]' ],
				},
				{
					id: 'raster-forest-national-scale-layer',
					visible: true,
					type: 'raster',
					url: [ `https://eyxf13ux54.execute-api.eu-central-1.amazonaws.com/production/singleband/sdfe-hack/prediction-trees-2018-area01/2018/class/{z}/{x}/{y}.png?colormap=explicit&explicit_color_map=${encodeURIComponent(
						JSON.stringify({ 0: '#FFFFFF', 1: '#FE7860' })
					)}` ],
				},
			],
			onChapterExit: [
				{
					id: 'raster-forest-national-scale-layer-optical',
					visible: false,
					type: 'raster',
				},
				{
					id: 'raster-forest-national-scale-layer',
					visible: false,
					type: 'raster',
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
