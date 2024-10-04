import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeroFormData, schema } from "./schema";
import { useForm } from "react-hook-form";
import { HeroSourceResponse } from "../../services/heroSourceServices";

interface HeroFormProps {
  onSubmit: (data: HeroFormData) => unknown;
  hero: HeroSourceResponse
}

const HeroForm = ({ hero, onSubmit,}: HeroFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<HeroFormData>({
    resolver: zodResolver(schema),
  });

  isSubmitSuccessful && reset();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
<input id="name" type="text" defaultValue={hero.name} {...register("name")} />
{errors?.name && <small>{errors.name.message}</small>}
        </div>
        <div>
          <label htmlFor="combat">Combat</label>
<input id="combat" type="number" defaultValue={hero.powerstats.combat} {...register("combat", { valueAsNumber: true })} />
{errors?.combat && <small>{errors.combat.message}</small>}
        </div>
        <div>
          <label htmlFor="durability">Durability</label>
<input id="durability" type="number" defaultValue={hero.powerstats.durability} {...register("durability", { valueAsNumber: true })} />
{errors?.durability && <small>{errors.durability.message}</small>}
        </div>
        <div>
          <label htmlFor="intelligence">Intelligence</label>
<input id="intelligence" type="number" defaultValue={hero.powerstats.intelligence} {...register("intelligence", { valueAsNumber: true })} />
{errors?.intelligence && <small>{errors.intelligence.message}</small>}
        </div>
        <div>
          <label htmlFor="power">Power</label>
<input id="power" type="number" defaultValue={hero.powerstats.power} {...register("power", { valueAsNumber: true })} />
{errors?.power && <small>{errors.power.message}</small>}
        </div>
        <div>
          <label htmlFor="speed">Speed</label>
<input id="speed" type="number" defaultValue={hero.powerstats.speed} {...register("speed", { valueAsNumber: true })} />
{errors?.speed && <small>{errors.speed.message}</small>}
        </div>
        <div>
          <label htmlFor="strength">Strength</label>
<input id="strength" type="number" defaultValue={hero.powerstats.strength} {...register("strength", { valueAsNumber: true })} />
{errors?.strength && <small>{errors.strength.message}</small>}
        </div>
        <div>
          <label htmlFor="imageSmall">Image</label>
<input id="imageSmall" type="text" defaultValue={hero.images.sm} {...register("imageSmall")} />
{errors?.imageSmall && <small>{errors.imageSmall.message}</small>}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default HeroForm;
