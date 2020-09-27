import { PersonItem, BahncardItem, ChangeoverItem, PriceItem, DepartureTimeItem, PartsOfDay } from "../../models/widget";


export const personList: PersonItem[] = Array.from({ length: 10 }, (_, index): PersonItem => {
  const personsCount = index + 1;

  return {
    title: `${personsCount} ${personsCount === 1 ? 'Person' : 'Personen'}`,
    value: `${personsCount}`,
    selected: personsCount === 1,
  };
});


export const bahnCards: BahncardItem[] = [
  {
    value: "",
    title: "Ohne Bahncard",
    selected: true,
  },
  { 
    value: "db_bahncard_25_2_klasse",
    title: "DB Bahncard 25 2. Klasse"
  },
  {
    value: "db_bahncard_25_1_klasse",
    title: "DB Bahncard 25 1. Klasse"
  },
  {
    value: "db_bahncard_50_2_klasse",
    title: "DB Bahncard 50 2. Klasse"
  },
  {
    value: "db_bahncard_50_1_klasse",
    title: "DB Bahncard 50 1. Klasse"
  },
  {
    value: "db_bahncard_100_2_klasse",
    title: "DB Bahncard 100 2. Klasse"
  },
  {
    value: "db_bahncard_100_1_klasse",
    title: "DB Bahncard 100 1. Klasse"
  },
  {
    value: "familienkarte_des_landes_oberoesterreich",
    title: "Familienkarte des Landes Oberoesterreich",
  },
  {
    value: "kaernten_card",
    title: "Kaernten Card"
  },
  {
    value: "oesterr_behindertenpass_mind_70_behinderungsgrad",
    title: "Oesterr Behindertenpass mind 70 Behinderungsgrad",
  },
  {
    value: "railplus_card",
    title: "Railplus Card"
  },
  {
    value: "salzburger_familienpass",
    title: "Salzburger Familienpass",
  },
  {
    value: "sbb_halbtax_abo",
    title: "Sbb Halbtax Abo",
  },
  {
    value: "sbb_general_abo_1_klasse",
    title: "Sbb General Abo 1. Klasse",
  },
  {
    value: "sbb_general_abo_2_klasse",
    title: "Sbb General Abo 2. Klasse",
  },
  {
    value: "sbb_general_abo_1_klasse_mit_railplus",
    title: "Sbb General Abo 1. Klasse mit Railplus",
  },
  {
    value: "sbb_general_abo_2_klasse_mit_railplus",
    title: "Sbb General Abo 2. Klasse mit Railplus",
  },
  {
    value: "sbb_halbtax_abo_mit_railplus",
    title: "Sbb Halbtax Abo mit Railplus",
  },
  {
    value: "steir_familienpass",
    title: "Steir Familienpass",
  },
  {
    value: "ticket_stadtverkehr_innsbruck",
    title: "Ticket Stadtverkehr Innsbruck",
  },
  {
    value: "ticket_stadtverkehr_graz",
    title: "Ticket Stadtverkehr Graz",
  },
  {
    value: "ticket_stadtverkehr_linz",
    title: "Ticket Stadtverkehr Linz",
  },
  {
    value: "ticket_stadtverkehr_stadt_salzburg",
    title: "Ticket Stadtverkehr Stadt Salzburg",
  },
  {
    value: "ticket_stadtverkehr_wien",
    title: "Ticket Stadtverkehr Wien",
  },
  {
    value: "tiroler_familienpass",
    title: "Tiroler Familienpass",
  },
  {
    value: "vorteilscard_bundesheer",
    title: "Vorteilscard Bundesheer",
  },
  {
    value: "vorteilscard_classic",
    title: "Vorteilscard Classic",
  },
  {
    value: "vorteilscard_family",
    title: "Vorteilscard Family",
  },
  {
    value: "vorarlberger_familienpass",
    title: "Vorarlberger Familienpass",
  },
  {
    value: "vorteilscard_jugend",
    title: "Vorteilscard Jugend",
  },
  {
    value: "vorteilscard_senior",
    title: "Vorteilscard Senior",
  },
  {
    value: "zulassungskarte_zu_at_fbg",
    title: "Zulassungskarte zu at Fbg",
  },
]

export const changeoverOptions: ChangeoverItem[] = [
  {
    title: 'Umstiege',
    value: 'all',
    disabled: true,
  },
  {
    title: 'Direkt',
    value: '0',
  },
  {
    title: '1 Umstieg',
    value: '1'
  },
  {
    title: '2 Umstiege',
    value: '2',
  },
  {
    title: '3 Umstiege',
    value: '3',
  },
  {
    title: '4 Umstiege',
    value: '4',
  },
  {
    title: '5 Umstiege',
    value: '5',
  },
  {
    title: '6 Umstiege',
    value: '6',
  },
];

export const pricesOptions: PriceItem[] = [
  {
    title: 'Preis',
    value: 'all',
    disabled: true,
  },
  {
    title: '< 50 EUR',
    value: '0,50',
  },
  {
    title: '50-100 EUR',
    value: '50,100'
  },
  {
    title: '100-150 EUR',
    value: '100,150',
  },
  {
    title: '150-200 EUR',
    value: '150,200',
  },
  {
    title: '> 200 EUR',
    value: '200,1000000000',
  }
];

export const departureOptions: DepartureTimeItem[] = [
  {
    title: 'Abreise',
    value: PartsOfDay.default,
    disabled: true,
  },
  {
    title: 'Morgens',
    value: PartsOfDay.morning,
  },
  {
    title: 'Mittags',
    value: PartsOfDay.lunchTime,
  },
  {
    title: 'Abends',
    value: PartsOfDay.evening,
  },
];
