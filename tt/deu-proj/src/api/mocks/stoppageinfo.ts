import { StopPageInfo, FacilitiesTypes } from "../../models/stop";
import { TransportsTypes } from "../../models/transports";

export const stopPageInfoMocks: StopPageInfo = {
  city_name: 'München',
  title: 'Fraunhoferstraße',
  link_to_search_provider: {
    title: '',
    url: '#'
  },
  available_facilities: [
    {
      type: FacilitiesTypes.wheelchair,
      available: true,
    },
    {
      type: FacilitiesTypes.wheelchair,
      available: false,
    },
    {
      type: FacilitiesTypes.wc,
      available: true,
    },
    {
      type: FacilitiesTypes.elevator,
      available: true,
    },
  ],
  transports: [

    {
      type: TransportsTypes.uBahn,
    },
    {
      type: TransportsTypes.sBahn,
    },
    {
      type: TransportsTypes.bus,
    },
  ],
  lines: [
    {
      provider: TransportsTypes.uBahn,
      type: 'u2'
    },
    {
      provider: TransportsTypes.uBahn,
      type: 'u1'
    },
    {
      provider: TransportsTypes.sBahn,
      type: 's2'
    },
    {
      provider: TransportsTypes.sBahn,
      type: 's3'
    },
    {
      provider: TransportsTypes.sBahn,
      type: 's8'
    },
    {
      provider: TransportsTypes.bus,
      type: '62'
    },
    {
      provider: TransportsTypes.bus,
      type: '68'
    },
  ]
}