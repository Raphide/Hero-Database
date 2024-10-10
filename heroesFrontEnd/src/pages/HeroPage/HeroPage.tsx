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
    console.log(searchTerm?.toString())
    console.log(heroes)
  }

  const offsetData = heroes?.filter((_hero, index) => index >= start && index < end) || data?.filter((_hero, index) => index >= start && index < end);

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

  const dataLength = heroes?.length || data?.length|| 0;

  return (
    <div className={styles.page}>
      <span>
        <div className={styles.buttonborder}>
      <button onClick={handlePrev} disabled={page === 1}>
        prev
      </button></div>
      <h2>{page}</h2>
      <div className={styles.buttonborder}>
      <button onClick={handleNext} disabled={end >= dataLength}>
        next
      </button></div></span><SearchBar onSearch={handleSearch} />
      <div className={styles.cards}>
      {data && offsetData?.map((hero) => (
        <HeroCard key={hero.id} hero={hero} heroType="SOURCE" />
      ))}
      </div>
      <span>
        <div className={styles.buttonborder}>
      <button onClick={handlePrev} disabled={page === 1}>
        prev
      </button></div>
      <h2>{page}</h2>
      <div className={styles.buttonborder}>
      <button onClick={handleNext} disabled={end >= dataLength}>
        next
      </button></div></span>
    </div>
  );
};

export default HeroPage;
