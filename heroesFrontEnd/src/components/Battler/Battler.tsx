import React, { useEffect, useState } from "react";
import {
  getSavedHeroById,
  SavedHeroResponse,
} from "../../services/saveHeroServices";
import styles from "./Battler.module.scss"

interface BattlerProps {
  heroId1: number;
  heroId2: number;
}

const Battler = ({ heroId1, heroId2 }: BattlerProps) => {
  const [id1, setId1] = useState<number>(heroId1);
  const [id2, setId2] = useState<number>(heroId2);
  const [hero1, setHero1] = useState<SavedHeroResponse | null>(null);
  const [hero2, setHero2] = useState<SavedHeroResponse | null>(null);
  const [hp1, setHp1] = useState<number>(0);
  const [hp2, setHp2] = useState<number>(0);
  const [baseHp1, setBaseHp1] = useState<number>(0)
  const [baseHp2, setBaseHp2] = useState<number>(0)
  const [attack1, setAttack1] = useState<number>(0);
  const [attack2, setAttack2] = useState<number>(0);
  const [order1, setOrder1] = useState<boolean>(false);
  const [order2, setOrder2] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [combat1, setCombat1] = useState<number>(0);
  const [combat2, setCombat2] = useState<number>(0);
  const [durability1, setDurability1] = useState<number>(0);
  const [durability2, setDurability2] = useState<number>(0);
  const [intelligence1, setIntelligence1] = useState<number>(0);
  const [intelligence2, setIntelligence2] = useState<number>(0);
  const [power1, setPower1] = useState<number>(0);
  const [power2, setPower2] = useState<number>(0);
  const [speed1, setSpeed1] = useState<number>(0);
  const [speed2, setSpeed2] = useState<number>(0);
  const [strength1, setStrength1] = useState<number>(0);
  const [strength2, setStrength2] = useState<number>(0);

  useEffect(() => {
    setId1(heroId1);
    console.log(id1);
    getSavedHeroById(id1)
      .then((hero) => setHero1(hero))
      .catch((e) => console.log(e));
  }, [id1, heroId1]);

  useEffect(() => {
    setId2(heroId2);
    console.log(id2);
    getSavedHeroById(id2)
      .then((hero) => setHero2(hero))
      .catch((e) => console.log(e));
  }, [id2, heroId2]);

  useEffect(() => {
    setMessage("")
    if (hero1 && hero2) {
      setHp1(
        Math.floor(
          hero1.powerstats.durability *
            ((hero1.powerstats.intelligence + hero1.powerstats.speed) * 0.6)
        )
      );
      setHp2(
        Math.floor(
          hero2.powerstats.durability *
            ((hero2.powerstats.intelligence + hero2.powerstats.speed) * 0.6)
        )
      );
      setBaseHp1(
        Math.floor(
          hero1.powerstats.durability *
            ((hero1.powerstats.intelligence + hero1.powerstats.speed) * 0.6)
        )
      );
      setBaseHp2(
        Math.floor(
          hero2.powerstats.durability *
            ((hero2.powerstats.intelligence + hero2.powerstats.speed) * 0.6)
        )
      );
      setAttack1(
        Math.floor((hero1.powerstats.combat *
          ((hero1.powerstats.strength + hero1.powerstats.power) * 0.2) * 0.5)
      ));
      setAttack2(
        Math.floor((hero2.powerstats.combat *
          ((hero2.powerstats.strength + hero2.powerstats.power) * 0.2) * 0.5)
      ));
      if (hero1.powerstats.speed >= hero2.powerstats.speed) {
        setOrder1(true);
        setOrder2(false);
      } else {
        setOrder1(false);
        setOrder2(true);
      }
    }
  }, [start === true]);

  const handleAttack1 = () => {
    setHp2(Math.floor(hp2 - attack1));
    setOrder1(!order1);
    setOrder2(!order2);
    setMessage(`${hero1?.name} attacked ${hero2?.name} for ${attack1} damage!`);
  };

  const handleAttack2 = () => {
    setHp1(Math.floor(hp1 - attack2));
    setOrder1(!order1);
    setOrder2(!order2);
    setMessage(`${hero2?.name} attacked ${hero1?.name} for ${attack2} damage!`);
  };

const battleMessage = () => {
    if(hp1 <= 0){
        return `${hero2?.name} wins!`
    } else if (hp2 <= 0){
        return `${hero1?.name} wins!`
    } else {
        return message;
    }
}

  const statColor = (level: number) => {
    if(level < 6){
      return "firebrick"
    }else if(level < 16){
      return "red"
    } else if (level < 32) {
      return "orangered";
    }else if(level < 48){
      return "gold"
    }else if (level < 64) {
      return "yellow";
     } else if(level < 80){
      return "lime"
    } else if(level < 95) {
      return "limegreen";
    } else {
      return "mediumspringgreen"
    }
  };

  return (
    <div>
      <button onClick={() => setStart(!start)}>
        {start === false ? "FIGHT" : "RESET"}
      </button>
      {start && (
        <div>
          <span>
            <div>
              <h1>{hero1?.name}</h1>
              <img src={hero1?.images.sm}/>
              <h3>HP: {hp1 >= 0 ? hp1 : "LOSER"}</h3>
              <div>
                <p>HP: </p>
                <div className={styles.statbar}><div
              className={styles.bar}
              style={{
                backgroundColor: statColor(hp1),
                height: "100%",
                width: `${hp1 <= 0 ? 0 : hp1/baseHp1 * 100 }%`,
              }}
            ></div></div>
              </div>
              <button data-testid="attack1"
                onClick={handleAttack1}
                disabled={order1 === false || hp1 <= 0 || hp2 <= 0}
              >
                ATTACK
              </button>
            </div>
            <div>
              <h1> VS </h1>
            </div>
            <div>
              <h1>{hero2?.name}</h1>
              <img src={hero2?.images.sm}/>
              <h3>HP: {hp2 >= 0 ? hp2 : "LOSER"}</h3>
              <div>
                <p>HP: </p>
                <div className={styles.statbar}><div
              className={styles.bar}
              style={{
                backgroundColor: statColor(hp2/baseHp2 * 100),
                height: "100%",
                width: `${hp2 <= 0 ? 0 : hp2/baseHp2 * 100 }%`,
               }}
            ></div></div>
              </div>
              <button data-testid="attack2"
                onClick={handleAttack2}
                disabled={order2 === false || hp1 <= 0 || hp2 <= 0}
              >
                ATTACK
              </button>
            </div>
          </span>
          <div>
            <h1 data-testid="battleMessage">{battleMessage()}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Battler;
