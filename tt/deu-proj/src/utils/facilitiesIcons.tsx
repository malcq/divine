import React, { ReactElement } from 'react';
import { Icon } from 'react-icons-kit';
//wc
import { venusMars } from 'react-icons-kit/fa/venusMars'
// wheelchair
import { wheelchair } from 'react-icons-kit/fa/wheelchair'
// wifi
import { wifi } from 'react-icons-kit/fa/wifi'
//db info
import { info } from 'react-icons-kit/fa/info'
//carHire
import { road } from 'react-icons-kit/fa/road'
//taxi
import { taxi } from 'react-icons-kit/fa/taxi'
//localTransport
import { bus } from 'react-icons-kit/fa/bus'
//parkingSpaces
import { automobile } from 'react-icons-kit/fa/automobile'
//luggageLockers
import { inbox } from 'react-icons-kit/fa/inbox'
// bicycleParking
import { bicycle } from 'react-icons-kit/fa/bicycle'
// central3S
import { phone } from 'react-icons-kit/fa/phone'
//elevator 
import { sortAmountAsc } from 'react-icons-kit/fa/sortAmountAsc'
//dbLounge
import { coffee } from 'react-icons-kit/fa/coffee'
//mobileService
import { lifeRing } from 'react-icons-kit/fa/lifeRing'
//lostProperty
import { briefcase } from 'react-icons-kit/fa/briefcase'
//travelCenter
import { ticket } from 'react-icons-kit/fa/ticket'
//bahnhofsmission
import { umbrella } from 'react-icons-kit/fa/umbrella'
//mobilityService
import { wheelchairAlt } from 'react-icons-kit/fa/wheelchairAlt'
// travelItems
import { newspaperO } from 'react-icons-kit/fa/newspaperO'
// defailt 
import { questionCircleO } from 'react-icons-kit/fa/questionCircleO'

import { FacilitiesTypes } from '../models/stop';

const facilitiesIconsByEnum: { [type: string]: any } = {
  [FacilitiesTypes.bahnhofsmission]: umbrella,
  [FacilitiesTypes.bicycleParking]: bicycle,
  [FacilitiesTypes.carHire]: road,
  [FacilitiesTypes.central3S]: phone,
  [FacilitiesTypes.dbInformation]: info,
  [FacilitiesTypes.dbLounge]: coffee,
  [FacilitiesTypes.elevator]: sortAmountAsc,
  [FacilitiesTypes.localTransport]: bus,
  [FacilitiesTypes.lostProperty]: briefcase,
  [FacilitiesTypes.luggageLockers]: inbox,
  [FacilitiesTypes.mobileService]: lifeRing,
  [FacilitiesTypes.mobilityService]: wheelchairAlt,
  [FacilitiesTypes.travelCenter]: ticket,
  [FacilitiesTypes.parkingSpaces]: automobile,
  [FacilitiesTypes.taxi]: taxi,
  [FacilitiesTypes.wifi]: wifi,
  [FacilitiesTypes.wc]: venusMars,
  [FacilitiesTypes.wheelchair]: wheelchair,
  [FacilitiesTypes.travelItems]: newspaperO,
}

export default (type: FacilitiesTypes, values: { size: number }): ReactElement => {

  const icon = facilitiesIconsByEnum[type] ?? questionCircleO;

  return <Icon size={values.size} icon={icon} />
}

