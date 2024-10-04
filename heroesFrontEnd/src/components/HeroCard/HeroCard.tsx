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
  const status = heroType === "SOURCE" ? hero.powerstats : hero;

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
        <img src={hero.images?.sm || status.imageSmall} />
        <div className={styles.stats}>
          <p>Combat: {status.combat}</p>
          <p>Durability: {status.durability}</p>
          <p>Intelligence: {status.intelligence}</p>
          <p>Power: {status.power}</p>
          <p>Speed: {status.speed}</p>
          <p>Strength: {status.strength}</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(status.combat),
                height: "100%",
                width: `${status.combat}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(status.durability),
                height: "100%",
                width: `${status.durability}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(status.intelligence),
                height: "100%",
                width: `${status.intelligence}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(status.power),
                height: "100%",
                width: `${status.power}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(status.speed),
                height: "100%",
                width: `${status.speed}%`,
              }}
            ></div>
          </div>
          <div className={styles.statbar}>
            <div
              className={styles.bar}
              style={{
                backgroundColor: statColor(status.strength),
                height: "100%",
                width: `${status.strength}%`,
              }}
            ></div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default HeroCard;
