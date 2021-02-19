// eslint-disable-next-line import/no-extraneous-dependencies
import { GeoJsonLayer, IconLayer, TextLayer } from '@deck.gl/layers'
// eslint-disable-next-line import/no-extraneous-dependencies
import { TileLayer } from '@deck.gl/geo-layers'

type Layertypes = GeoJsonLayer<any> | IconLayer<any> | TileLayer<any> | TextLayer<any>
export default Layertypes
