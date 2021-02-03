import { IconLayer } from '@deck.gl/layers';

const generateMarkerLayer = (id: string, data: any[] = [], visible: boolean = true, ): IconLayer<any> => {
	return new IconLayer({
		id: id,
		visible: visible,
		data: data,
		iconAtlas: 'https://grasdatastorage.blob.core.windows.net/images/marker_gras.png',
		iconMapping: {
			marker: {
				x: 2,
				y: 5,
				width: 128,
				height: 128,
				anchorX: 128,
				anchorY: 128,
				mask: false
			}
		},

		getIcon: d => 'marker',
		sizeScale: 15,
		getPosition: (d: any) => d.coordinates,
		getSize: d => 5,
	})
}

export default generateMarkerLayer;
