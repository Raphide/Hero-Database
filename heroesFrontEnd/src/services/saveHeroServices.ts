import axios from "axios";
import { HeroFormData } from "../components/HeroForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface SavedHeroResponse {
  id: number
  name: string
  powerstats: PowerStats
  images: Images
}

export interface PowerStats {
  id: number
  combat: number
  durability: number
  intelligence: number
  power: number
  speed: number
  strength: number
}

export interface Images {
  id: number
  xs: any
  sm: string
  md: any
  lg: any
}

export const saveHero = async (data: HeroFormData) => {
  const response = await axios.post<HeroFormData>(baseURL + "/heroes", data);
  if(response.status !== 201){
    throw new Error("failed to save " + data.name);
  }
  return response.data;
};

export const getAllSavedHeroes = async () => {
    const response = await axios.get<SavedHeroResponse[]>(baseURL + "/heroes");
    if(response.status !== 200){
        throw new Error("failed to fetch saved heroes");
    }
    return response.data;
}
