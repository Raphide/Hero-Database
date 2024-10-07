package nology.io.heroes.PowerStats;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import nology.io.heroes.Hero.Hero;

@Entity
@Table(name = "powerstats")
public class Powerstats {

    public Powerstats() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column
    private int combat;

    @Column
    private int durability;

    @Column
    private int intelligence;

    @Column
    private int power;

    @Column
    private int speed;

    @Column
    private int strength;

    @OneToOne(mappedBy = "powerstats")
    private Hero hero;

    public int getCombat() {
        return combat;
    }

    public void setCombat(int combat) {
        this.combat = combat;
    }

    public int getDurability() {
        return durability;
    }

    public void setDurability(int durability) {
        this.durability = durability;
    }

    public int getIntelligence() {
        return intelligence;
    }

    public void setIntelligence(int intelligence) {
        this.intelligence = intelligence;
    }

    public int getPower() {
        return power;
    }

    public void setPower(int power) {
        this.power = power;
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public int getStrength() {
        return strength;
    }

    public void setStrength(int strength) {
        this.strength = strength;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // public Hero getHero() {
    //     return hero;
    // }

    // public void setHero(Hero hero) {
    //     this.hero = hero;
    // }

    // public PowerStats(int combat, int durability, int intelligence, int power, int speed, int strength) {
    //     this.combat = combat;
    //     this.durability = durability;
    //     this.intelligence = intelligence;
    //     this.power = power;
    //     this.speed = speed;
    //     this.strength = strength;
    // }
    
    

}
