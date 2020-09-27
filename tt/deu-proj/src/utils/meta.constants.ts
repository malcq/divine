import { PageMetaInformation } from "../models/meta";

export const homepageMeta: PageMetaInformation = {
  description: "Günstige Tickets, beste Verbindungen, Fahrplanauskunft (Abfahrt & Ankunft) und Haltestelleninfos für Regio- und Fernverkehr, U-Bahn, S-Bahn,  Straßenbahn und Bus",
  keywords: "Fahrplan, Fahrplanauskunft, Haltestelle, Bahnhof, Nahverkehr, Station, Ankunft, Abfahrt, Zug, günstige Preise, beste Verbindung"
}

export const journeyLandingPageMeta: PageMetaInformation = {
  keywords: "Fahrplan, Haltestelle, Bahnhof, Nahverkehr, Station, Ankunft, Abfahrt, Zug, Bus, günstige Preise, beste Verbindung",
  description: "Günstige Tickets, beste Verbindungen, Fahrplanauskunft (Abfahrt & Ankunft) und Haltestelleninfos für Regio- und Fernverkehr, U-Bahn, S-Bahn,  Straßenbahn und Bus",
}

export const privacyPagesMeta: PageMetaInformation = {
  robots: "noindex, nofollow"
}

// creators
type getStopPageMetaOptions = {
  state?: string,
  city?: string,
  title?: string,
}
export function getStopPageMeta(
  options: getStopPageMetaOptions = {}
): PageMetaInformation {
  const {
    city = '',
    state = '',
    title = '',
  } = options;


  const keywords = `${title}, ${city}, ${state}` +
    `, Nahverkehr, Bahnhof, Netzplan, U-Bahn, S-Bahn, Straßenbahn, Bus, Abfahrt, Ankunft`;

  const description = `Fahrplanauskunft der Haltestelle bzw. Bahnhof ` 
    + `${title} in ${city}`;

  return {
    description,
    keywords,
  }
}


type getJourneyPageMetaOptions = {
  origin?: string,
  destination?: string,
}
export function getJourneyPageMeta(
  options: getJourneyPageMetaOptions
): PageMetaInformation {
  const {
    destination = '',
    origin = ''
  } = options;

  const keywords = `${origin}, ${destination}, ` 
    + `Nahverkehr, Bahnhof, Netzplan, U-Bahn, S-Bahn, Straßenbahn, Bus, Abfahrt, Ankunft`;

  return {
    keywords,
    description: "Günstige Tickets, beste Verbindungen, Fahrplanauskunft (Abfahrt & Ankunft) und Haltestelleninfos für Regio- und Fernverkehr, U-Bahn, S-Bahn,  Straßenbahn und Bus",
  }
}

type getStopLandingPageMetaOptions = {
  title?: string,
}
export function getStopLandingPageMeta(
  options: getStopLandingPageMetaOptions
): PageMetaInformation {
  const { title = '' } = options;

  return {
    keywords: `Fahrplan, Haltestelle, Station, Nahverkehr, Ankunft, Abfahrt, ${title}`,
    description: `Fahrplanauskunft (Abfahrt & Ankunft) und Haltesstelleninfos für ${title}`
  }
}

