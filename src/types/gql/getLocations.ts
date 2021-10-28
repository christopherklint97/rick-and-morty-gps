export interface LocationsData {
  results: Location[];
}

export interface LocationsVars {
  page: number;
  filter: FilterLocation;
}

export interface FilterLocation {
  type: string;
  dimension: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { id: number };
  location: { id: number };
}
