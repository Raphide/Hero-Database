package nology.io.heroes.Hero;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import nology.io.heroes.Images.Images;
import nology.io.heroes.PowerStats.Powerstats;

@Service
public class HeroService {

    @Autowired
    HeroRepository repo;

    public Hero createHero(@Valid CreateHeroDTO data) {
        Hero newHero = new Hero();
        Powerstats newStats = new Powerstats();
        Images newImg = new Images();
        newHero.setName(data.getName());
        newStats.setCombat(data.getCombat());
        newStats.setDurability(data.getDurability());
        newStats.setIntelligence(data.getIntelligence());
        newStats.setPower(data.getPower());
        newStats.setSpeed(data.getSpeed());
        newStats.setStrength(data.getStrength());
        newHero.setPowerstats(newStats);
        newImg.setSm(data.getSm());
        newHero.setImages(newImg);
        return this.repo.save(newHero);
    }

    public List<Hero> findAll(){
        return this.repo.findAll();
    }

    

}
