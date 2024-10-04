import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HeroFormData } from '../../components/HeroForm/schema';
import { useQuery } from '@tanstack/react-query';
import { getSourceHeroById } from '../../services/heroSourceServices';
import HeroForm from '../../components/HeroForm/HeroForm';
import { saveHero } from '../../services/saveHeroServices';

const SaveHeroPage = () => {
    const navigate = useNavigate();
    const {id} = useParams() as unknown as {id: number};
    const formSubmit = (heroData: HeroFormData) => {
        saveHero(heroData).then(()=> navigate("/")).catch((e)=> console.log(e));
    }
    const {isPending, isFetching, isError, data, error} = useQuery({
        queryKey: ["heroes"],
        queryFn: () => getSourceHeroById(id),
    });

    
    if (isPending || isFetching) {
        return <span>Loading...</span>;
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }

  return (
    <div>
        <HeroForm onSubmit={formSubmit} hero={data} />
    </div>
  )
}

export default SaveHeroPage