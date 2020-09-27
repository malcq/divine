
import { getStopPage, AllAvailableOptions } from '../api/stops';
import { SERVER_ERRORS } from '@utils/constants';
import { getWidgetInitialProps } from '@utils/index';
import { AutocompleteItemTypes } from '@models/autocomplete';
import { faqContentBuilder } from '@utils/faqContent';
import { ErrorObj, ParsedUrlQuery } from '../models/common';
import { getRelevantTime } from './time/getRelevantTime';
import { getStringFromQuery } from './getStringFromQuery';


const StopService = async (query: ParsedUrlQuery, errObj: ErrorObj) => {
  const {
    state,
    city,
    stop,
    date,
    time,
    direction,
    transports,
    lines,
    userAgent
  } = query;

  const stopTableOpt: AllAvailableOptions = {
    name: stop,
    city,
    state,
    date,
    dir: direction,
    lines,
    time,
    transports,
    userAgent
  };
  const { dateParam, timeParam } = getRelevantTime({
    date: getStringFromQuery(date),
    time: getStringFromQuery(time)
  });

  try {
    var [{
      stopInfo,
      additionalInfo,
    },
      stopList,
      faq,
    ] = await getStopPage({
      ...stopTableOpt,
      time: timeParam,
      date: dateParam
    });

    if (!stopList.transports.length) {
      throw new Error(SERVER_ERRORS.NO_RESULTS_IN_TIME)
    }
  
  } catch (e) {
    console.log('Initial data fetching err', e.message);
    errObj.status = true;
    errObj.message = e.message;
  }

  const widgetProps = getWidgetInitialProps(
    {
      stopFrom: {
        title: stopInfo?.stop_name ?? '',
        city: stopInfo?.city,
        state: stopInfo?.state,
        place_type: AutocompleteItemTypes.place,
        stop_id: stopInfo?.stop_id,
        short_title: stopInfo?.short_title
      },
      departure: query.direction,
      time: timeParam,
      date: dateParam,
      card: query.card,
    }
  );

  const faqSectionsContent = faqContentBuilder({
    apiFaq: faq
  });

  return {
    initialWidgetProps: widgetProps,
    stopList,
    stopInfo,
    additionalInfo,
    faqContent: faqSectionsContent,
    errObj: errObj,
  };
}


export default StopService;