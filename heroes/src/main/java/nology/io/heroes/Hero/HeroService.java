package nology.io.heroes.Hero;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class HeroService {

    @Autowired
    HeroRepository repo;

    public Hero createHero(@Valid CreateHeroDTO data) {
        Hero newHero = new Hero();
        newHero.setName(data.getName());
        newHero.setCombat(data.getCombat());
        newHero.setDurability(data.getDurability());
        newHero.setIntelligence(data.getIntelligence());
        newHero.setPower(data.getPower());
        newHero.setSpeed(data.getSpeed());
        newHero.setStrength(data.getStrength());
        newHero.setImageSmall(data.getImageSmall());
        return this.repo.save(newHero);
    }

    public List<Hero> findAll(){
        return this.repo.findAll();
    }

    

}
