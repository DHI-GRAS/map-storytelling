var config = {
  style: 'mapbox://styles/mapbox/satellite-v9',
  footer: 'Source: source citations, etc.',
  chapters: [
		{
			id: 'forest-national-scale-layer',
			alignment: 'left',
      title: 'National forest mapping',
      // image: './path/to/image/source.png',
			description: 'National forest mapping',
			location: {
        center: [10.165798, 55.513295],
        zoom: 6,
        pitch: 60,
        bearing: 0,
      },
      callback: '',
      onChapterEnter: [
				{
					id: 'raster-forest-national-scale-layer',
					visible: true,
					type: "raster",
					url: 'https://ix8zgaqqe1.execute-api.eu-central-1.amazonaws.com/production/rgb/composite/20180501/1/{z}/{x}/{y}.png?r=B04&g=B03&b=B02&r_range=[0,2000]&b_range=[0,2000]&g_range=[0,2000]'
				},
				{
					id: 'all-markers-forest-national-scale-layer',
					visible: false,
					type: "marker"
				}
			],
      onChapterExit: [
				{
					id: 'raster-forest-national-scale-layer',
					visible: true,
					type: "raster",
				}
			],
		},
		{
			alignment: 'right',
      title: 'National forest mapping',
      // image: './path/to/image/source.png',
			description: 'National forest mapping 2nd version',
			location: {
				center: [10.165798, 55.513295],
        zoom: 6,
        pitch: 60,
        bearing: 0,
      },
      callback: '',
      onChapterEnter: [
				{
					id: 'all-markers-forest-national-scale-layer',
					visible: true,
					type: "marker",
					data:
					[
							{
								coordinates:[10.165798,55.513295],
								name: "National forest mapping"
							},
							{
								coordinates: [11.931931451403903,54.575430797189625],
								name: "A: The sand dune that disappeared"
							},
							{
								coordinates: [11.947387726660498,54.57506135095206],
								name: "B: Dynamic danish landscape"
							},
							{
								coordinates: [9.81878839989416,54.904766036118524],
								name: "C: The city filled with tiny and dynamic objects"
							},
							{
								coordinates: [10.19916535101355,55.10831373009],
								name: "D: The country side"
							},
							{
								coordinates: [10.21482134128163,55.10815610067341],
								name: "E: The country side"
							},
							{
								coordinates: [10.20881828631708,57.47134378201429],
								name: "F: The country side"
							}
					]
			},
			],
      onChapterExit: [
				{
					id: 'all-markers-forest-national-scale-layer',
					visible: true,
					type: "marker"
				}
			],
		},
    {
      alignment: 'left',
      title: 'A: The sand dune that disappeared',
      // image: './path/to/image/source.png',
      description: 'The sand dune that disappeared - uncovered by SDFE data',
      location: {
        center: [11.931931451403903, 54.575430797189625],
        zoom: 16,
        pitch: 60,
        bearing: 0,
      },
      callback: '',
      onChapterEnter: [
        // {
        //     layer: 'layer-name',
        //     opacity: 1,
        //     duration: 5000
        // }
      ],
      onChapterExit: [
        // {
        //     layer: 'layer-name',
        //     opacity: 0
        // }
      ],
    },
    {
      alignment: 'right',
      title: 'B: Dynamic danish landscape',
      // image: './path/to/image/source.png',
      description:
        'Tracking and monitoring small landscape features and invasive species in the dynamic Danish landscape',
      location: {
        center: [11.947387726660498, 54.57506135095206],
        zoom: 12,
        pitch: 60,
        bearing: -43.2,
      },
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
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
      alignment: 'right',
      hidden: false,
      title: 'C: The city filled with tiny and dynamic objects',
      // image: './path/to/image/source.png',
      description: 'The city filled with tiny and dynamic objects',
      location: {
        center: [9.81878839989416, 54.904766036118524],
        zoom: 16,
        pitch: 60,
        bearing: -43.2,
      },
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      alignment: 'left',
      hidden: false,
      title: 'D: The country side',
      // image: './path/to/image/source.png',
      description: 'The country side with all its small landscape features',
      location: {
        center: [10.19916535101355, 55.10831373009],
        zoom: 12,
        pitch: 80,
        bearing: -43.2,
      },
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
		},
		{
      alignment: 'left',
      hidden: false,
      title: 'E: The country side',
      // image: './path/to/image/source.png',
      description: 'The country side with all its small landscape features',
      location: {
        center: [10.21482134128163, 55.10815610067341],
        zoom: 10,
        pitch: 90,
        bearing: 0,
      },
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
		},
		{
      alignment: 'left',
      hidden: false,
      title: 'F: The country side',
      // image: './path/to/image/source.png',
      description: 'The country side with all its small landscape features',
      location: {
        center: [10.20881828631708, 57.47134378201429],
        zoom: 13,
        pitch: 60,
        bearing: 90,
      },
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
  ],
};

export default config
