package nology.io.heroes.Hero;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UpdateHeroDTO {

    @NotNull
    @Min(1)
    @Max(100)
    private int combat;

    @NotNull
    @Min(1)
    @Max(100)
    private int durability;

    @NotNull
    @Min(1)
    @Max(100)
    private int intelligence;

    @NotNull
    @Min(1)
    @Max(100)
    private int power;

    @NotNull
    @Min(1)
    @Max(100)
    private int speed;

    @NotNull
    @Min(1)
    @Max(100)
    private int strength;

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

    

}
