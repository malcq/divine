export type BusTrainOptions = {
  tripType: string,
  depStopOptions: StationOption
  arrStopOptions: StationOption
};

export type StationOption = {
  itemProp: string,
  itemType: string,
}