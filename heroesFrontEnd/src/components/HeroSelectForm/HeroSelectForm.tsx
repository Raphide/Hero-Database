import React from "react";
import { getAllSavedHeroes } from "../../services/saveHeroServices";
import { useQuery } from "@tanstack/react-query";
import { schema, SelectFormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface HeroSelectProps {
  onSelect: (id: SelectFormData) => void;
}

const HeroSelectForm = ({ onSelect }: HeroSelectProps) => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<SelectFormData>({ resolver: zodResolver(schema) });

  const { isSuccess, isFetching, isPending, isError, data, error } = useQuery({
    queryKey: ["heroes"],
    queryFn: getAllSavedHeroes,
  });

  if (isError) {
    console.log(error.message);
  }

  if (isPending || isFetching) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSelect)}>
        <label>Hero Select</label>
        <select id="id" {...register("id", { valueAsNumber: true })}>
          <option>Please Select</option>
          {data && data?.map((hero) => (
            <option key={hero.id} value={hero.id}>
              {hero.name}
            </option>
          ))}
        </select>
        {errors?.id && <small>{errors.id.message}</small>}
        <button>{isSubmitSuccessful ? "Ready" : "Select"}</button>
      </form>
    </div>
  );
};

export default HeroSelectForm;
