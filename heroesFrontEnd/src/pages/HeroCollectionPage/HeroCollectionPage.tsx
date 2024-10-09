import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteSavedHeroById, getAllSavedHeroes } from "../../services/saveHeroServices";
import HeroCard from "../../components/HeroCard/HeroCard";
import styles from "./HeroCollection.module.scss";

const HeroCollectionPage = () => {
  const [start, setstart] = useState<number>(0);
  const [end, setEnd] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { isFetching, isPending, isError, data, error } = useQuery({
    queryKey: ["heroes"],
    queryFn: getAllSavedHeroes,
  });

  if (isError) {
    console.log(error.message);
  }

  if (isPending || isFetching) {
    return <span>Loading...</span>;
  }

  const offsetData = data?.filter(
    (_hero, index) => index >= start && index < end
  );

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

  const dataLength = data?.length || 0;

  return (
    <div>
      <button onClick={handlePrev} disabled={page === 1}>
        prev
      </button>
      <h2>{page}</h2>
      <button onClick={handleNext} disabled={end >= dataLength}>
        next
      </button>
     <div className={styles.cards}>
        {offsetData?.map((hero) => (
          <HeroCard key={hero.id} hero={hero} heroType={"SAVED"} />
        ))}
      </div>
    </div>
  );
};

export default HeroCollectionPage;
