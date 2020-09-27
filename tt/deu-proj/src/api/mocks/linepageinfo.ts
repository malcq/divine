import { LineStops } from "../../models/linePageInfo";
import { TransportsTypes } from "../../models/transports";

const linePageInfo: LineStops = {
  transfer_provider: TransportsTypes.uBahn,
  line: 'u2',
  dep_name: 'Ramersdorf',
  arr_name: 'Feldmoching',
  line_stops: [
    {
      forward_direction: {
        dep_time: '2020-02-20T08:07:00.000',
        arr_time: '2020-02-20T08:00:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T15:57:00.000',
        arr_time: '2020-02-20T15:37:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Ramersdorf',
      current: false,
    },
    {
      forward_direction: {
        dep_time: '2020-02-20T08:27:00.000',
        arr_time: '2020-02-20T08:23:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T15:07:00.000',
        arr_time: '2020-02-20T15:03:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Silberhornstraße',
      current: false,
    },
    {
      forward_direction: {
        dep_time: '2020-02-20T09:00:00.000',
        arr_time: '2020-02-20T08:52:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T14:37:00.000',
        arr_time: '2020-02-20T14:32:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Silberhornstraße',
      current: false,
    },
    {
      forward_direction: {
        dep_time: '2020-02-20T09:35:00.000',
        arr_time: '2020-02-20T09:30:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T14:00:00.000',
        arr_time: '2020-02-20T13:55:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Fraunhoferstraße',
      current: true,
    },
    {
      forward_direction: {
        dep_time: '2020-02-20T10:07:00.000',
        arr_time: '2020-02-20T09:59:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T13:45:00.000',
        arr_time: '2020-02-20T13:40:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Sendlinger Tor',
      current: false,
    },
    {
      forward_direction: {
        dep_time: '2020-02-20T10:50:00.000',
        arr_time: '2020-02-20T10:45:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T13:00:00.000',
        arr_time: '2020-02-20T12:55:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Königsplatz',
      current: false,
    },
    {
      forward_direction: {
        dep_time: '2020-02-20T11:35:00.000',
        arr_time: '2020-02-20T11:30:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T12:35:00.000',
        arr_time: '2020-02-20T12:30:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Frankfurter Ring',
      current: false,
    },
    {
      forward_direction: {
        dep_time: '2020-02-20T12:05:00.000',
        arr_time: '2020-02-20T12:00:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T12:05:00.000',
        arr_time: '2020-02-20T11:57:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Am Hart',
      current: false,
    },
    {
      forward_direction: {
        dep_time: '2020-02-20T12:35:00.000',
        arr_time: '2020-02-20T12:29:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T11:33:00.000',
        arr_time: '2020-02-20T11:29:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Dülferstraße',
      current: false,
    },
    {
      forward_direction: {
        dep_time: '2020-02-20T13:15:00.000',
        arr_time: '2020-02-20T13:10:00.000',
        platform_name: 'Gleis 1',
      },
      back_direction: {
        dep_time: '2020-02-20T11:05:00.000',
        arr_time: '2020-02-20T11:00:00.000',
        platform_name: 'Gleis 1',
      },
      stop_name: 'Feldmoching',
      current: false,
    },
  ]
};

export default linePageInfo;