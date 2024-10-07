import React, { useEffect, useState } from "react";
import HeroCard from "../../components/HeroCard/HeroCard";
import { useQuery } from "@tanstack/react-query";
import { getAllSourceHeroes, HeroSourceResponse } from "../../services/heroSourceServices";
import styles from "./HeroPage.module.scss"
import SearchBar from "../../components/SearchBar/SearchBar";

const HeroPage = () => {
  const [start, setstart] = useState<number>(0);
  const [end, setEnd] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<FormDataEntryValue | null>(null)
  const [heroes, setHeroes] = useState<HeroSourceResponse[]>()


  const { isFetching, isPending, isError, data, error } = useQuery({
    queryKey: ["heroes"],
    queryFn: getAllSourceHeroes,
    
  });
  
  if (isError) {
    console.log(error.message);
  }

  if (isPending || isFetching) {
    return <span>Loading...</span>;
  }

  const handleSearch = (term: FormDataEntryValue | null) => {
    setSearchTerm(term)
    if(term !== null){
      setHeroes(data?.filter((hero) => hero.name.toLowerCase().includes(term?.toString())))
    }
    console.log(term?.toString())
    console.log(heroes)
  }

  const offsetData = heroes?.filter((_hero, index) => index >= start && index < end) || data?.filter((_hero, index) => index >= start && index < end);
  // const offsetData = data?.filter((hero) => hero.id >= start && hero.id < end);

  const handlePrev = () => {
    setPage(page - 1);
    setstart(start - 10);
    setEnd(end - 10);
  };

  const handleNext = () => {
    setPage(page + 1);
    setstart(start + 10);
    setEnd(end + 10);
  };

  const dataLength = heroes?.length || 0;
  // const dataLength = data?.map((hero) => hero.id).length || 74;

  return (
    <div>
      <span>
      <button onClick={handlePrev} disabled={page === 1}>
        prev
      </button>
      <h2>{page}</h2>
      <button onClick={handleNext} disabled={end >= dataLength}>
        next
      </button></span><SearchBar onSearch={handleSearch} />
      <div className={styles.cards}>
      {data && offsetData?.map((hero) => (
        <HeroCard key={hero.id} hero={hero} heroType="SOURCE" />
      ))}
      </div>
    </div>
  );
};

export default HeroPage;
