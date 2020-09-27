import { faqContentBuilder } from "@utils/faqContent";
import { ErrorObj, ParsedUrlQuery } from "@models/common";



const initialStopData = (query: ParsedUrlQuery, errObj: ErrorObj) => {
  return {
    stopList: {
      stop_title: '',
      transports:[],
      available_line_filter: [],
      available_transports_filter: [],
      linesColorInfo: []
    },
    faqContent: faqContentBuilder({}),
    errObj
  }
};

export default initialStopData;