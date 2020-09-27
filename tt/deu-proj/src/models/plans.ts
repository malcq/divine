export interface Plan {
  title: string,
  pdf_link: string
}

export interface Net {
  image: string,
  provider: string,
  plans: Plan[],
}

export interface Line {
  plans: Plan[]
}

export interface PlansInfo {
  net: Net,
  line: Line
}