import { ProviderTypes } from '../utils/constants';
import { TransportsTypes } from './transports';

export interface Fare {
	name: string,
	comfort_class?: number,
	price_in_cents: number
}

export interface SegmentResponse {
	dep_name: string,
	arr_name: string,
	dep_offset: string,
	arr_offset: string,
	product: string,
	product_type: TransportsTypes,
	dep_platform: string,
	arr_platform: string,
	intermediate_stop: JourneyIntermediateStop[],
	stop_time_periods: number[],
	color?: string,
	text_color?: string,
}

export interface JourneyResponse {
	dep_name: string,
	arr_name: string,
	arr_offset: string,
	dep_offset: string,
	changeovers: number,
	duration: string,
	deeplink: string,
	fares: Fare[],
	segments: SegmentResponse[],
	provider: ProviderTypes,
}

export type ResponseSimplifiedList = {
  product: string,
  product_type: TransportsTypes,
}

// For Outer table
export interface OuterResponse extends JourneyResponse {
	main_price?: number,
}

// For Inner table
export interface InnerResponse extends JourneyResponse {
  scheme: string,
  estimated_reaching_time: string[],
	simplified_journey_list: ResponseSimplifiedList[],
}

export type TransportAndLines = {
  transport_type: TransportsTypes,
  lines: string[],
}

export interface JourneyIntermediateStop {
	name: string,
	time: string,
	platform: string,
}