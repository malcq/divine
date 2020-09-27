import { AvailableFacilities, FacilitiesTypes, ResponseFacilities } from "../models/stop";

export const facilitiesTitles = {
  db_information: 'DB Information',
  mobile_service: 'Mobiler Service',
  travel_center: 'Reisezentrum',
  db_lounge: 'DB Lounge',
  luggage_lockers: 'Schließfach',
  mobility_service: 'Mobilitätsservice',
  stepfree_access: 'Stufenfreier Zugang',
  lost_property: 'Fundservice',
  central_3s: '3-S-Zentrale',
  toilets: 'WC',
  parking_spaces: 'Parkplätze',
  parking_spaces_for_bicycles: 'Fahrrad-Stellplätze',
  local_transport: 'ÖPNV-Anbindung',
  taxis: 'Taxi',
  car_hire: 'Mietwagen',
  travel_items: 'Reisebedarf',
  wifi: 'WLAN im Bahnhof',
  bahnhofsmission: 'Bahnhofsmission',
  elevator: 'Aufzug',
}



export const facilities = (resp: ResponseFacilities) => {

  const allFacilities = Object.values(FacilitiesTypes);

  return allFacilities.reduce((acc: AvailableFacilities[], curr) => {
    if (curr in resp) {
      return [
        ...acc,
        {
          ...resp[curr],
          available: true,
          name: curr
        }
      ]
    }
    return [
      ...acc,
      {
        title: facilitiesTitles[curr],
        description: '',
        available: false,
        name: curr
      }
    ];
  }, [])
} 