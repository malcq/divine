export enum FacilitiesTypes {
  wc = 'wc',
  elevator = 'elevator',
  wheelchair = 'wheelchair',
}

export interface FacilitiesItem {
  available: boolean,
  type: FacilitiesTypes,
}
