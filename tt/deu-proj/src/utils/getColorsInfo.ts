import { StopResponse, LinesColorInfo } from "@models/stop";
import { SegmentResponse } from "@models/journey";

export default (arr: StopResponse[] | SegmentResponse[], type: 'stop' | 'journey'): LinesColorInfo[] => {
  const linesColors = new Set<LinesColorInfo>();
  if (type === 'stop') {
    const newArr = <StopResponse[]>arr
    newArr.forEach((item) => {
      if (item.transport_info.color && item.transport_info.text_color) {
        const colorInfo: LinesColorInfo = {
          color: item.transport_info.color,
          text_color: item.transport_info.text_color,
          line: item.transport_info.line,
          transport: item.transport_info.transport
        }
        linesColors.add(colorInfo)
      }
    });
  }
  if (type === 'journey') {
    const newArr = <SegmentResponse[]>arr;
    newArr.forEach((item) => {
      if (item.color && item.text_color) {
        const colorInfo: LinesColorInfo = {
          color: item.color,
          text_color: item.text_color,
          line: item.product,
          transport: item.product_type
        }
        linesColors.add(colorInfo)
      }
    })
  }

  return Array.from(linesColors)
}