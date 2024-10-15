import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getSavedHeroById } from '../../services/saveHeroServices';
import styles from "./BattleCard.module.scss"
import HeroCard from '../HeroCard/HeroCard';

interface BattleCardProps {
    heroId: number;
  }

const BattleCard = ({heroId}: BattleCardProps) => {
    const [id, setId] = useState<number>(0);
    // useEffect(() => {
    //   setId(heroId);
    //   console.log(id);
    // }, []) 

    const handleClick = () => {
      setId(heroId);
      console.log(id);
    }

    const { isFetching, isPending, isError, data, error, } = useQuery({
        queryKey: ["heroes"],
        queryFn: () => getSavedHeroById(id),

      });


      if (isError) {
        console.log(error.message);
      }
    
      if (isPending || isFetching) {
        return <span>Loading...</span>;
      }

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <h1>Selected:</h1>
      <h1 key={data?.id}>{data?.name}</h1>
      {/* {data && <HeroCard key={data.id} hero={data} heroType={'SAVED'} />} */}
      <h1>{heroId.toString()}</h1>
      </div>
  )
}

export default BattleCard