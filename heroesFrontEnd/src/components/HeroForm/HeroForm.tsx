import { zodResolver } from "@hookform/resolvers/zod";
import { HeroFormData, schema } from "./schema";
import { useForm } from "react-hook-form";
import { HeroSourceResponse } from "../../services/heroSourceServices";
import { SavedHeroResponse } from "../../services/saveHeroServices";
import styles from "./HeroForm.module.scss";
import { ChangeEventHandler, SetStateAction, useState } from "react";

interface HeroFormProps {
  onSubmit: (data: HeroFormData) => unknown;
  hero: HeroSourceResponse | SavedHeroResponse;
}

const HeroForm = ({ hero, onSubmit }: HeroFormProps) => {
  const [combat, setCombat] = useState<number>(hero.powerstats.combat);
  const [durability, setDurability] = useState<number>(
    hero.powerstats.durability
  );
  const [intelligence, setIntelligence] = useState<number>(
    hero.powerstats.intelligence
  );
  const [power, setPower] = useState<number>(hero.powerstats.power);
  const [speed, setSpeed] = useState<number>(hero.powerstats.speed);
  const [strength, setStrength] = useState<number>(hero.powerstats.strength);

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
    <div className={styles.base}>
      <div className={styles.border}>
      <img src={hero.images.sm}/></div>
      <h1 className={styles.name}>{hero.name}</h1>
      <form  onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.border}>
        <div className={styles.statform}>
        <div className={styles.hidden}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            defaultValue={hero.name}
            {...register("name")}
          />
          {errors?.name && <small>{errors.name.message}</small>}
        </div>
        <div className={styles.statslider}>
          <label htmlFor="combat">Combat</label>
          <span>
            <h3>{combat}</h3>
            <input
              id="combat"
              type="range"
              min={1}
              max={100}
              defaultValue={hero.powerstats.combat}
              {...register("combat", { valueAsNumber: true })}
              onChange={(e) => setCombat(e.target.valueAsNumber)}
            />
          </span>
          {errors?.combat && <small>{errors.combat.message}</small>}
        </div>
        <div className={styles.statslider}>
          <label htmlFor="durability">Durability</label>
          <span>
            <h3>{durability}</h3>
            <input
              id="durability"
              type="range"
              min={1}
              max={100}
              defaultValue={hero.powerstats.durability}
              {...register("durability", { valueAsNumber: true })}
              onChange={(e) => setDurability(e.target.valueAsNumber)}
            />
          </span>
          {errors?.durability && <small>{errors.durability.message}</small>}
        </div>
        <div className={styles.statslider}>
          <label htmlFor="intelligence">Intelligence</label>
          <span>
            <h3>{intelligence}</h3>
            <input
              id="intelligence"
              type="range"
              min={1}
              max={100}
              defaultValue={hero.powerstats.intelligence}
              {...register("intelligence", { valueAsNumber: true })}
              onChange={(e) => setIntelligence(e.target.valueAsNumber)}
            />
          </span>
          {errors?.intelligence && <small>{errors.intelligence.message}</small>}
        </div>
        <div className={styles.statslider}>
          <label htmlFor="power">Power</label>
          <span>
            <h3>{power}</h3>
            <input
              id="power"
              type="range"
              min={1}
              max={100}
              defaultValue={hero.powerstats.power}
              {...register("power", { valueAsNumber: true })}
              onChange={(e) => setPower(e.target.valueAsNumber)}
            />
          </span>
          {errors?.power && <small>{errors.power.message}</small>}
        </div>
        <div className={styles.statslider}>
          <label htmlFor="speed">Speed</label>
          <span>
            <h3>{speed}</h3>
            <input
              id="speed"
              type="range"
              min={1}
              max={100}
              defaultValue={hero.powerstats.speed}
              {...register("speed", { valueAsNumber: true })}
              onChange={(e) => setSpeed(e.target.valueAsNumber)}
            />
          </span>
          {errors?.speed && <small>{errors.speed.message}</small>}
        </div>
        <div className={styles.statslider}>
          <label htmlFor="strength">Strength</label>
          <span>
            <h3>{strength}</h3>
            <input
              id="strength"
              type="range"
              min={1}
              max={100}
              defaultValue={hero.powerstats.strength}
              {...register("strength", { valueAsNumber: true })}
              onChange={(e) => setStrength(e.target.valueAsNumber)}
            />
          </span>
          {errors?.strength && <small>{errors.strength.message}</small>}
        </div>
        <div className={styles.hidden}>
          <label htmlFor="imageSmall">Image</label>
          <input
            id="imageSmall"
            type="text"
            defaultValue={hero.images.sm}
            {...register("sm")}
          />
          {errors?.sm && <small>{errors.sm.message}</small>}
        </div></div></div>
        <div className={styles.buttonborder}>
        <button>Submit</button></div>
      </form>
    </div>
  );
};

export default HeroForm;
