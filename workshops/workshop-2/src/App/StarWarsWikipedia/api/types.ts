export interface DataWithPagination<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export interface Person {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
  films: string[];
  species: string[];
  starships: string[];
  created: string;
}

export type People = Person[];

export enum Resources {
  people = "people",
  films = "films",
  planets = "planets",
  species = "Species",
  vehicles = "vehicles",
  starships = "starships"
}

export interface ResourcesData {
  Resources: string;
}
