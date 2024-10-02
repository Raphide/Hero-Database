import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
const sourceURL = "https://akabab.github.io/superhero-api/api";

export interface HeroSourceResponse {
  id: number;
  name: string;
  slug: string;
  powerstats: Powerstats;
  appearance: Appearance;
  biography: Biography;
  work: Work;
  connections: Connections;
  images: Images;
}

export interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export interface Appearance {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  eyeColor: string;
  hairColor: string;
}

export interface Biography {
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
}

export interface Work {
  occupation: string;
  base: string;
}

export interface Connections {
  groupAffiliation: string;
  relatives: string;
}

export interface Images {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

export const getAllSourceHeroes = async () => {
  const response = await axios.get<HeroSourceResponse[]>(
    sourceURL + "/all.json"
  );
  if (response.status !== 200) {
    throw new Error("failed to fetch Heroes");
  }
  return response.data;
};

export const getSourceHeroById = async (id: number) => {
    const response = await axios.get<HeroSourceResponse>(sourceURL + `/id/${id}.json`);
    if(response.status !== 200) {
        throw new Error("failed to fetch Hero under id " + id);
    }
    return response.data;
}
