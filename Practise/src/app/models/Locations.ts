export interface City {
  id: number;
  name: string;
  stateId: number;
}

export interface State {
  id: number;
  name: string;
  countryId: number;
  country: Country;
  city: City[];
}

export interface Country {
  id: number;
  name: string;
  state: State[];
}
