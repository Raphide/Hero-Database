import React, { useEffect, useState } from "react";
import styles from "./BattlePage.module.scss";
import { useQuery } from "@tanstack/react-query";
import {
  getAllSavedHeroes,
  getSavedHeroById,
} from "../../services/saveHeroServices";
import HeroSelectForm from "../../components/HeroSelectForm/HeroSelectForm";
import BattleCard from "../../components/BattleCard/BattleCard";
import { SelectFormData } from "../../components/HeroSelectForm/schema";



const BattlePage = () => {
    const [hero1, setHero1] =useState<number>(0);
    const [hero2, setHero2] =useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    

    const selectHero1 = (id: { id: number; }) => {
        setHero1(id.id)
    }
    const selectHero2 = (id: { id: number; }) => {
        setHero2(id.id)
    }

    // useEffect(()=> {
    //   if(hero1 !==0 && hero2 !==0){
    //     setIsOpen(true)
    //   }  
    // },[hero1, hero2])

const handleClick = () => {
console.log(hero1);
console.log(hero2);
}


  return (
    <div>
      <span>
        <div>
          <h1>Player 1</h1>
          <HeroSelectForm onSelect={selectHero1} />
        </div>
        <div>
          <h1>Player 2</h1>
          <HeroSelectForm onSelect={selectHero2}/>
        </div>
      </span>
      <button onClick={handleClick}>Debug</button>
      {isOpen && <BattleCard heroId={hero1}/>}
      {isOpen && <BattleCard heroId={hero2}/>}
    </div>
  );
};

export default BattlePage;
