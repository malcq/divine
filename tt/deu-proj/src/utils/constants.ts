import { TransportsTypes } from "../models/transports";
import { keyframes } from "styled-components";

/**
 * List of pages from /pages folder
 * We need it to achieve router factory and double routing as nextjs propose
 * 
 * In case you need another page:
 * - create new one in pages folder
 * - add here it's app url without '/'
 * - implement factory or constant in router.util if you need it
 */
export enum AppPages {
  home = '',
  stop = 'stop',
  journeys = 'journeys',
  line = 'line',
  test = 'test',
  federal = 'federal',
  journeysLanding = 'journeys-landing',
  flightLanding = 'flight-landing',
  privacy = 'privacy',
  imprint = 'imprint',  // Impressum page
  photoCredits = 'photo-credits', // Bildernachweis page
};

export const SERVER_ERRORS = {
  STOP_NOT_FOUND: 'stop not found',
  INVALID_TIME: 'invalid time',
  NO_RESULTS_IN_TIME: 'results not found',
  NO_TRAIN_RESULTS_IN_TIME: 'Im angegebenen Zeitraum verkehren an dieser Haltestelle keine Züge.',
  COULDNT_FIND_STOP: 'Couldn\'t find stop'
}

export const CANCEL_ERR_MSG = {
  cancel_msg: 'Canceled request'
}

export const SKELETON = {
  backgroundColor: 'rgba(0, 0, 0, 0.07)',
  background: 'linear-gradient(-90deg,rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.7) 30%,rgba(255,255,255,0.4) 50%,rgba(255,255,255,0.2) 100%)',
  animation: keyframes`
    0% {
      transform: translateX(0) rotate(45deg);
      opacity: 1;
    }
    40%, 100% {
      opacity: 0;
      transform: translateX(1550%) rotate(45deg);
    }
  `,
}

export const STOP_LANDING_LIMIT = 10;

// if error happens in the component and doesn't exists here - it's bad and we shouldn't show it text there
export const ALLOWABLE_ERRORS = [
  SERVER_ERRORS.STOP_NOT_FOUND,
]
export const SCHEMA_URL = process.env.SCHEMA_URL;
export const BASE_URL = process.env.API_URL;
export const MAIN_DOMAIN = process.env.MAIN_DOMAIN;
export const PROTOCOL = process.env.PROTOCOL;

export const STATIC_BASE_URL = `/static`;

export const STATIC_URLS = {
  IMAGES: `${STATIC_BASE_URL}/images`,
  ICONS: `${STATIC_BASE_URL}/icons`,
  LOGO: `${STATIC_BASE_URL}/images/logos`,
  SVG: `${STATIC_BASE_URL}/images/svg`,
  SVG_FACILITIES: `${STATIC_BASE_URL}/images/svg/facilities`,
  JOURNEY_CITIES: `${STATIC_BASE_URL}/images/journeycities`,
  JOURNEY_AIRPORTS: `${STATIC_BASE_URL}/images/airports`,
  WEATHER_ICONS: `${STATIC_BASE_URL}/images/weather-icons`,
  META: `${STATIC_BASE_URL}/meta`,
}

export enum DeviceTypes {
  mobile = 'mobile',
  desktop = 'desktop',
  tablet = 'tablet',
}

export enum SearchWidgetSections {
  stops,
  journey,
}

export enum DepartureTypes {
  from = 'dep',
  to = 'arr',
}

export enum QueryTransportsTypes {
  both = 'both',
  bus = 'bus',
  bahn = 'bahn',
}


export interface linesType {
  [name: string]: LineInfo
};

export type LineInfo = {
  text: string,
  color: string,
};

interface TransportInfo {
  text: string,
  baseColor: string,
  image: {
    url: string,
    alt: string,
  },
  sprite: {
    backgroundPosition: string,
    backgroundSize: string,
  }
}

export const TRANSPORT_INFO: { [type: string]: TransportInfo } = {
  'bus': {
    text: 'Bus',
    baseColor: '#006879',
    image: {
      url: `${STATIC_URLS.LOGO}/bus.png`,
      alt: 'Bus',
    },
    sprite: {
      backgroundPosition: '79.0476% 40.0000%',
      backgroundSize: '556.522%',
    }
  },
  'sbahn': {
    text: 'S-Bahn',
    baseColor: '#00722D',
    image: {
      url: `${STATIC_URLS.LOGO}/sbahn.png`,
      alt: 'S-Bahn',
    },
    sprite: {
      backgroundPosition: '0.952381% 77.1429%',
      backgroundSize: '556.522%'
    }
  },
  'ubahn': {
    text: 'U-Bahn',
    baseColor: '#0069BE',
    image: {
      url: `${STATIC_URLS.LOGO}/ubahn.png`,
      alt: 'U-Bahn',
    },
    sprite: {
      backgroundPosition: '99.0741% 38.8889%',
      backgroundSize: '640.000%' 
    }
  },
  'str': {
    text: 'Tram',
    baseColor: '#DE0000',
    image: {
      url: `${STATIC_URLS.LOGO}/tram.png`,
      alt: 'Tram',
    },
    sprite: {
      backgroundPosition: '66.9811% 76.4151%',
      backgroundSize: '581.818%',
    }
  },
  'tram': {
    text: 'Tram',
    baseColor: '#DE0000',
    image: {
      url: `${STATIC_URLS.LOGO}/tram.png`,
      alt: 'Tram',
    },
    sprite: {
      backgroundPosition: '66.9811% 76.4151%',
      backgroundSize: '581.818%',
    }
  },
  're': {
    text: 'Regioverkehr',
    baseColor: '#B6B6B6',
    image: {
      url: `${STATIC_URLS.LOGO}/region.png`,
      alt: 'Regioverkehr',
    },
    sprite: {
      backgroundPosition: '45.2830% 76.4151%',
      backgroundSize: '581.818%',
    }
  },
  'long-distance-traffic': {
    text: 'Fernverkehr',
    baseColor: '#00D202',
    image: {
      url: `${STATIC_URLS.LOGO}/fernverkehr.png`,
      alt: 'Fernverkehr',
    },
    sprite: {
      backgroundPosition: '23.5849% 76.4151%',
      backgroundSize: '581.818%',
    }
  },
  'ec_ic': {
    text: 'Intercity',
    baseColor: '#172588',
    image: {
      url: `${STATIC_URLS.LOGO}/eu_ic.png`,
      alt: 'Intercity'
    },
    sprite: {
      backgroundPosition: '1.13636% 1.13636%',
      backgroundSize: '320.000%',
    }
  },
  'ice': {
    text: 'Intercity Express',
    baseColor: '#969696',
    image: {
      url: `${STATIC_URLS.LOGO}/ice.png`,
      alt: 'Intercity Express'
    },
    sprite: {
      backgroundPosition: '47.7273% 1.13636%',
      backgroundSize: '320.000%',
    }
  },
  'ir': {
    text: 'Interregio',
    baseColor: '#58585A',
    image: {
      url: `${STATIC_URLS.LOGO}/ir.png`,
      alt: 'Interregio'
    },
    sprite: {
      backgroundPosition: '47.7273% 46.6667%',
      backgroundSize: '320.000%',
    }
  },
  'taxi': {
    text: 'Taxi',
    baseColor: '#FFDE00',
    image: {
      url: `${STATIC_URLS.LOGO}/taxi.png`,
      alt: 'Taxi'
    },
    sprite: {
      backgroundPosition: '82.5000% 55.0000%',
      backgroundSize: '1600.00%',
    }
  },
  'faehre': {
    text: 'Faehre',
    baseColor: '#118592',
    image: {
      url: `${STATIC_URLS.LOGO}/ferry.png`,
      alt: 'Ferry'
    },
    sprite: {
      backgroundPosition: '1.13636% 46.6667%',
      backgroundSize: '320.000%',
    }
  },
  default: {
    text: 'N/A',
    baseColor: '#fff',
    image: {
      url: `${STATIC_URLS.LOGO}/default_mark.png`,
      alt: 'N/A'
    },
    sprite: {
      backgroundPosition: '94.3182% 1.12994%',
      backgroundSize: '320.000%',
    }
  }
};

interface ProviderInfo {
  text: string,
  baseColor: string,
  image: {
    url: string,
    alt: string,
  },
  sprite: {
    backgroundPosition: string,
    backgroundSize: string,
  }
}

export enum ProviderTypes {
  flixbus = 'flixbus',
  deutsche_bahn = 'bahn',
  unknown = 'N/A',
}

export const PROVIDER_INFO: { [type: string]: ProviderInfo } = {
  [ProviderTypes.flixbus]: {
    text: 'Flixbus',
    baseColor: '#00D202',
    image: {
      url: `${STATIC_URLS.LOGO}/flixbus.png`,
      alt: 'Flixbus'
    },
    sprite: {
      backgroundPosition: '1.12994% 88.9831%',
      backgroundSize: '324.051%',
    }
  },
  [ProviderTypes.deutsche_bahn]: {
    text: 'Deutsche Bahn',
    baseColor: '#E30614',
    image: {
      url: `${STATIC_URLS.LOGO}/db.png`,
      alt: 'Bahn'
    },
    sprite: {
      backgroundPosition: '73.4513% 55.9322%',
      backgroundSize: '853.333%',
    }
  },
  [ProviderTypes.unknown]: {
    text: 'N/A',
    baseColor: '#fff',
    image: {
      url: `${STATIC_URLS.LOGO}/default_mark.png`,
      alt: 'N/A'
    },
    sprite: {
      backgroundPosition: '94.3182% 1.12994%',
      backgroundSize: '320.000%',
    }
  }
}

export const ANIMATION_VALUES = {
  CARD_OPENING_ANIMATION: {
    enterAnimation: 300,
    exitAnimation: 300,
    buttonRotateTime: 300,
    appearAnimation: 300,
  },
  POSITION_TRANSITION: {
    type: 'tween',
    duration: 0.5,
  },
  TANSITION: {
    duration: 0.3
  },
  DROPDOWN_ANIMATION: {
    transition: 300,
    timeout: {
      appear: 0,
      enter: 300,
      exit: 0
    }
  },
  FAQ_CARD_ANIMATION: {
    enterAnimation: 250
  }
};

export enum Cities {
  berlin = 'Berlin',
  bonn = 'Bonn',
  bremen = 'Bremen',
  dresden = 'Dresden',
  duesseldorf = 'Düsseldorf',
  duisburg = 'Duisburg',
  dortmund = 'Dortmund',
  essen = 'Essen',
  frankfurt = 'Frankfurt am Main',
  hamburg = 'Hamburg',
  hannover = 'Hannover',
  koeln = 'Köln',
  leipzig = 'Leipzig',
  muenchen = 'München',
  muenster = 'Münster',
  nuernberg = 'Nürnberg',
  stuttgart = 'Stuttgart',
  wuppertal = 'Wuppertal'
};

export const JOURNEY_CITY_IMG: { [type: string]: { url: string } } = {
  [Cities.berlin]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/berlin.jpg`
  },
  [Cities.bonn]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/bonn.jpg`
  },
  [Cities.bremen]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/bremen.jpg`
  },
  [Cities.dortmund]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/dortmund.jpg`
  },
  [Cities.dresden]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/dresden.jpg`
  },
  [Cities.duesseldorf]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/duesseldorf.jpg`
  },
  [Cities.duisburg]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/duisburg.jpg`
  },
  [Cities.essen]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/essen.jpg`
  },
  [Cities.frankfurt]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/frankfurt-am-main.jpg`
  },
  [Cities.hamburg]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/hamburg.jpg`
  },
  [Cities.hannover]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/hannover.jpg`
  },
  [Cities.koeln]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/koeln.jpg`
  },
  [Cities.leipzig]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/leipzig.jpg`
  },
  [Cities.muenchen]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/muenchen.jpg`
  },
  [Cities.muenster]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/muenster.jpg`
  },
  [Cities.nuernberg]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/nuernberg.jpg`
  },
  [Cities.stuttgart]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/stuttgart.jpg`
  },
  [Cities.wuppertal]: {
    url: `${STATIC_URLS.JOURNEY_CITIES}/wuppertal.jpg`
  },
};

export enum DayOfWeek {
  mon = 'monday',
  tue = 'tuesday',
  wed = 'wednesday',
  thu = 'thursday',
  fri = 'friday',
  sat = 'saturday',
  sun = 'sunday',
};

/**
 * German grammar for transport types, if type inside DIE_ARTICLE array
 * then it 'DIE' else 'DER'
 * ex: 'Die S-Bahn', but 'Der Bus'  
 */
export const DIE_ARTICLE = [
  TransportsTypes.uBahn,
  TransportsTypes.sBahn,
  TransportsTypes.tram,
  TransportsTypes.regionTraffic
]


export const AD_NETWORK_ID = process.env.AD_NETWORK_ID;

export interface DesktopProps {
  [key: string]: {
    slotName: string,
    sizes: number[][],
    slotId: string,
  }
}

export interface MobileProps {
  [key: string]: {
    slotName: string,
    sizes: number[][],
    slotId: string,
  }
}

export const ADS_DESKTOP: DesktopProps = {
  FG_Header: {
    slotName: "FG_Header",
    slotId: "div-gpt-ad-1570027407289-0",
    sizes: [[970, 250], [728, 90]],
  },
  FG_Billboard: {
    slotName: "FG_Billboard",
    slotId: "div-gpt-ad-1570026915441-0",
    sizes: [[970, 250], [728, 90]],
  },
  FG_Billboard2: {
    slotName: 'FG_Billboard2',
    slotId: 'div-gpt-ad-1570026986316-0',
    sizes: [[970, 250], [728, 90]],
  },
  FG_Sky: {
    slotName: "FG_SKY",
    slotId: "div-gpt-ad-1570027043360-0",
    sizes: [[300, 600], [160, 600]],
  },
}

export const ADS_MOBILE: MobileProps = {
  FG_Center1: {
    slotName: "FG_Center1",
    slotId: "div-gpt-ad-1570029082494-0",
    sizes: [[320, 250], [300, 250], [300, 150], [320, 150]]
  }, 
  FG_Center2: {
    slotName: "FG_Center2",
    slotId: "div-gpt-ad-1570029163409-0",
    sizes: [[300, 250], [320, 250], [1, 1]],
  },
  FG_Center3: {
    slotName: "FG_Center3",
    slotId: "div-gpt-ad-1570029185488-0",
    sizes: [[320, 250], [300, 250], [1, 1]],
  },
  FG_Center4: {
    slotName: "FG_Center4",
    slotId: "div-gpt-ad-1570029211169-0",
    sizes: [[320, 250], [300, 250], [300, 150], [320, 150], [1, 1]], 
  }
}
