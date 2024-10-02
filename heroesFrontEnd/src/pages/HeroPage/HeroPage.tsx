import React, { useState } from "react";
import HeroCard from "../../components/HeroCard/HeroCard";
import { useQuery } from "@tanstack/react-query";
import { getAllSourceHeroes } from "../../services/heroSourceServices";

const HeroPage = () => {
  const [start, setstart] = useState<number>(1);
  const [end, setEnd] = useState<number>(11);
  const [page, setPage] = useState<number>(1);

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

  const offsetData = data?.filter((_hero, index) => index >= start && index < end);
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

  const dataLength = data?.length || 0;
  // const dataLength = data?.map((hero) => hero.id).length || 74;

  return (
    <div>
      <button onClick={handlePrev} disabled={page === 1}>
        prev
      </button>
      <h2>{page}</h2>
      <button onClick={handleNext} disabled={end >= dataLength}>
        next
      </button>
      {offsetData?.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};

export default HeroPage;
