var config = {
  style: 'mapbox://styles/mapbox/streets-v11',
  showMarkers: true,
  markerColor: '#3FB1CE',
  theme: 'light',
  use3dTerrain: false,
  // title: 'The Title Text of this Story',
  // subtitle: 'A descriptive and interesting subtitle to draw in the reader',
  // byline: 'By a Digital Storyteller',
  footer: 'Source: source citations, etc.',
  chapters: [
    {
      id: 'slug-style-id',
      alignment: 'left',
      hidden: false,
      title: 'The sand dune that disappeared',
      // image: './path/to/image/source.png',
      description: 'The sand dune that disappeared - uncovered by SDFE data',
      location: {
        center: [10.5523681640625, 57.730552143898464],
        zoom: 16,
        pitch: 60,
        bearing: 0,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
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
      id: 'other-identifier',
      alignment: 'right',
      hidden: false,
      title: 'Dynamic danish landscape',
      // image: './path/to/image/source.png',
      description:
        'Tracking and monitoring small landscape features and invasive species in the dynamic Danish landscape',
      location: {
        center: [8.50341796875, 57.01083265740579],
        zoom: 12,
        pitch: 60,
        bearing: -43.2,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'other-identifier-2',
      alignment: 'left',
      hidden: false,
      title: 'The dynamic evolving city',
      // image: './path/to/image/source.png',
      description: 'The dynamic evolving city',
      location: {
        center: [10.1788330078125, 56.18225387824831],
        zoom: 10,
        pitch: 60,
        bearing: -43.2,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'other-identifier-3',
      alignment: 'left',
      hidden: false,
      title: 'The city filled with tiny and dynamic objects',
      // image: './path/to/image/source.png',
      description: 'The city filled with tiny and dynamic objects',
      location: {
        center: [12.540893554687498, 55.71164005362048],
        zoom: 16,
        pitch: 60,
        bearing: -43.2,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'other-identifier-4',
      alignment: 'left',
      hidden: false,
      title: 'The country side',
      // image: './path/to/image/source.png',
      description: 'The country side with all its small landscape features',
      location: {
        center: [10.140380859375, 55.30413773740139],
        zoom: 10,
        pitch: 60,
        bearing: -43.2,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
  ],
};

export default config
