import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getSavedHeroById, SavedHeroResponse } from '../../services/saveHeroServices';
import styles from "./BattleCard.module.scss"
import HeroCard from '../HeroCard/HeroCard';

interface BattleCardProps {
    heroId: number;
    player: number;
  }

const BattleCard = ({heroId, player}: BattleCardProps) => {
    const [id, setId] = useState<number>(heroId);
    const [hero, setHero] = useState<SavedHeroResponse| null>(null)
    useEffect(() => {
      setId(heroId);
      console.log(id);
      getSavedHeroById(id).then((hero) => setHero(hero)).catch((e) => console.log(e));
    }, [id, heroId]) 

    // const handleClick = () => {
    //   setId(heroId);
    //   console.log(id);
      
    // }

    // const { isFetching, isPending, isError, data, error } = useQuery({
    //     queryKey: ["heroes"],
    //     queryFn: () => getSavedHeroById(id),

    //   });


    //   if (isError) {
    //     console.log(error.message);
    //   }
    
    //   if (isPending || isFetching) {
    //     return <span>Loading...</span>;
    //   }

  return (
    <div>
      {/* <button onClick={handleClick}>Click Me</button> */}
      <h1>{player === 1 ? "Player 1:" : "Player 2:"}</h1>
   {/* {hero && <h1>{hero.name}</h1>} */}
      <h1>{hero?.name}</h1> 
      {hero && <HeroCard key={hero.id} hero={hero} heroType={'SAVED'} />}
      {/* <h1>{heroId.toString()}</h1> */}
      </div>
  )
}

export default BattleCard