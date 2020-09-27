import { TRANSPORT_INFO } from '../../utils/constants';
import { TransportsTypes } from '../../models/transports';

interface BenefitInfo {
  iconSrc: string,
  title: string,
  text: string,
  baseColor: string,
  sprite: {
    backgroundPosition: string,
    backgroundSize: string,
  }
}

const info: BenefitInfo[] = [
  {
    iconSrc: 'ubahn.png',
    title: 'U-Bahn',
    text: 'u-bahn_text',
    baseColor: TRANSPORT_INFO[TransportsTypes.uBahn].baseColor,
    sprite: TRANSPORT_INFO[TransportsTypes.uBahn].sprite,
  },
  {
    iconSrc: 'sbahn.png',
    title: 'S-Bahn',
    text: 's-bahn_text',
    baseColor: TRANSPORT_INFO[TransportsTypes.sBahn].baseColor,
    sprite: TRANSPORT_INFO[TransportsTypes.sBahn].sprite,
  },
  {
    iconSrc: 'bus.png',
    title: 'Bus',
    text: 'bus_text',
    baseColor: TRANSPORT_INFO[TransportsTypes.bus].baseColor,
    sprite: TRANSPORT_INFO[TransportsTypes.bus].sprite,
  },
  {
    iconSrc: 'tram.png',
    title: 'Tram',
    text: 'tram_text',
    baseColor: TRANSPORT_INFO[TransportsTypes.tram].baseColor,
    sprite: TRANSPORT_INFO[TransportsTypes.tram].sprite,
  },
  {
    iconSrc: 'region.png',
    title: 'Regioverkehr',
    text: 'region-traffic_text',
    baseColor: TRANSPORT_INFO[TransportsTypes.regionTraffic].baseColor,
    sprite: TRANSPORT_INFO[TransportsTypes.regionTraffic].sprite,
  },
  {
    iconSrc: 'fernverkehr.png',
    title: 'Fernverkehr',
    text: 'long-distance-traffic_text',
    baseColor: TRANSPORT_INFO[TransportsTypes.longDistanceTraffic].baseColor,
    sprite: TRANSPORT_INFO[TransportsTypes.longDistanceTraffic].sprite,
  },
]

export default info;