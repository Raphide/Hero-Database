import axios from "axios";
import { HeroFormData } from "../components/HeroForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface SavedHeroResponse {
  id: number;
  name: string;
  combat: number;
  durability: number;
  intelligence: number;
  power: number;
  speed: number;
  strength: number;
  imageSmall: string;
}

export const saveHero = async (data: HeroFormData) => {
  const response = await axios.post<HeroFormData>(baseURL + "/heroes", data);
  if(response.status !== 201){
    throw new Error("failed to save " + data.name);
  }
  return response.data;
};
