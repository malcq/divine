import { STATIC_URLS } from '../../utils/constants';
import { PlansInfo } from '../../models/plans';



 const plansInfo: PlansInfo = {
  net: {
    image: 'image_link',
    provider: 'MVV Netzplan mit Tarifzonen',
    plans: [
      {
        title: 'Netzplan 1',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      },
      {
        title: 'Netzplan 2',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      },
      {
        title: 'Netzplan 3',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      }, 
      {
        title: 'Netzplan 4',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      },
      {
        title: 'Netzplan 5',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      },
      {
        title: 'Netzplan 6',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      }
    ]
  },
  line: {
    plans: [
      {
        title: 'Linienplan U-Bahn Linie U2',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      },
      {
        title: 'Linienplan U-Bahn Linie U2',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      },
      {
        title: 'Linienplan U-Bahn Linie U7',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      },
      {
        title: 'Linienplan U-Bahn Linie U7',
        pdf_link: 'https://fgis.gost.ru/fundmetrology/api/downloadfile/6fdd6356-495c-4d26-8b41-e0809d08bf93'
      }
    ]
  }
}
export default plansInfo;