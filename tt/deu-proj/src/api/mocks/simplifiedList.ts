import { ResponseSimplifiedList } from "../../models/journey";
import { TransportsTypes } from "../../models/transports";

const simplList: Array<ResponseSimplifiedList[]> = [
  [
    {
      product: 'S8',
      product_type: TransportsTypes.sBahn
    },
    {
      product: 'S25',
      product_type: TransportsTypes.sBahn
    },
    {
      product: 'U1',
      product_type: TransportsTypes.uBahn
    }
  ],
  [
    {
      product: '68',
      product_type: TransportsTypes.bus
    },
    {
      product: '62',
      product_type: TransportsTypes.bus
    },
    {
      product: 's2',
      product_type: TransportsTypes.sBahn
    }
  ]
];

export default simplList;

