import React, { useEffect, useState } from "react";
import {
  getSavedHeroById,
  SavedHeroResponse,
} from "../../services/saveHeroServices";

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
  const [attack1, setAttack1] = useState<number>(0);
  const [attack2, setAttack2] = useState<number>(0);
  const [order1, setOrder1] = useState<boolean>(false);
  const [order2, setOrder2] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);

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
    if (hero1 && hero2) {
      setHp1(
        Math.trunc(
          hero1.powerstats.durability *
            ((hero1.powerstats.intelligence + hero1.powerstats.speed) * 0.6)
        )
      );
      setHp2(
        Math.trunc(
          hero2.powerstats.durability *
            ((hero2.powerstats.intelligence + hero2.powerstats.speed) * 0.6)
        )
      );
      setAttack1(
        hero1.powerstats.combat *
          ((hero1.powerstats.strength + hero1.powerstats.power) * 0.2)
      );
      setAttack2(
        hero2.powerstats.combat *
          ((hero2.powerstats.strength + hero2.powerstats.power) * 0.2)
      );
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
    setHp2(Math.trunc(hp2 - attack1 * 0.5));
    setOrder1(!order1);
    setOrder2(!order2);
  };

  const handleAttack2 = () => {
    setHp1(Math.trunc(hp1 - attack2 * 0.5));
    setOrder1(!order1);
    setOrder2(!order2);
  };

  return (
    <div>
      <button onClick={() => setStart(!start)}>{start === false ? "FIGHT" : "RESET"}</button>
      {start && (
        <span>
          <div>
            <h1>{hero1?.name}</h1>
            <h3>HP: {hp1 >= 0 ? hp1 : "LOSER"}</h3>
            <button
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
            <h3>HP: {hp2 >= 0 ? hp2 : "LOSER"}</h3>
            <button
              onClick={handleAttack2}
              disabled={order2 === false || hp1 <= 0 || hp2 <= 0}
            >
              ATTACK
            </button>
          </div>
        </span>
      )}
    </div>
  );
};

export default Battler;
