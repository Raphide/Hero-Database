import React from 'react'
import HeroForm from '../../components/HeroForm/HeroForm'
import { HeroFormData } from '../../components/HeroForm/schema'
import { useNavigate, useParams } from 'react-router-dom';
import { getSavedHeroById, updateHeroById } from '../../services/saveHeroServices';
import { useQuery } from '@tanstack/react-query';

const UpdateHeroPage = () => {
    const navigate = useNavigate();
    const {id} = useParams() as unknown as {id: number};
    const formSubmit = (heroData: HeroFormData) => {
        updateHeroById(id, heroData).then(()=> navigate("/collection")).catch((e)=> console.log(e));
    }

    const {isPending, isFetching, isError, data, error} = useQuery({
        queryKey: ["heroes"],
        queryFn: () => getSavedHeroById(id),
    });

    if (isPending || isFetching) {
        return <span>Loading...</span>;
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }

  return (
    <HeroForm onSubmit={formSubmit} hero={data}/>
  )
}

export default UpdateHeroPage