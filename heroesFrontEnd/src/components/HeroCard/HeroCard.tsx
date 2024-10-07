import React from "react";
import { HeroSourceResponse } from "../../services/heroSourceServices";
import styles from "./HeroCard.module.scss";
import { Link } from "react-router-dom";
import { SavedHeroResponse } from "../../services/saveHeroServices";

type heroType = "SOURCE" | "SAVED";

interface HeroCardProps {
  heroType: heroType;
  hero: HeroSourceResponse | SavedHeroResponse;
}

const HeroCard = ({ hero, heroType }: HeroCardProps) => {
  // const status = heroType === "SOURCE" ? hero.powerstats : hero;

  const statColor = (level: number) => {
    if (level < 35) {
      return "firebrick";
    } else if (level < 70) {
      return "gold";
    } else {
      return "limegreen";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.topsides}>
          <Link to={`/save/${hero.id}`}>
            <button>Save Hero</button>
          </Link>
        </div>
        <h2>{hero.name}</h2>
        <div className={styles.topsides}>{heroType === "SAVED" && <button>Edit</button>}</div>
      </div>
      <span className={styles.contents}>
        <img src={hero.images.sm} />
        <div className={styles.stats}>
          <p>Combat: {hero.powerstats.combat}</p>
          <p>Durability: {hero.powerstats.durability}</p>
          <p>Intelligence: {hero.powerstats.intelligence}</p>
          <p>Power: {hero.powerstats.power}</p>
          <p>Speed: {hero.powerstats.speed}</p>
          <p>Strength: {hero.powerstats.strength}</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(hero.powerstats.combat),
                height: "100%",
                width: `${hero.powerstats.combat}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(hero.powerstats.durability),
                height: "100%",
                width: `${hero.powerstats.durability}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(hero.powerstats.intelligence),
                height: "100%",
                width: `${hero.powerstats.intelligence}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(hero.powerstats.power),
                height: "100%",
                width: `${hero.powerstats.power}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(hero.powerstats.speed),
                height: "100%",
                width: `${hero.powerstats.speed}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(hero.powerstats.strength),
                height: "100%",
                width: `${hero.powerstats.strength}%`,
              }}
            ></div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default HeroCard;
