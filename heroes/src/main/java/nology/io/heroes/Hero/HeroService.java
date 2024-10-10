package nology.io.heroes.Hero;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import nology.io.heroes.Images.Images;
import nology.io.heroes.PowerStats.Powerstats;
import nology.io.heroes.PowerStats.PowerstatsRepository;

@Service
public class HeroService {

    @Autowired
    HeroRepository repo;

    @Autowired
    PowerstatsRepository powerRepo;

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

    public Optional<Hero> findById(Long id) {
      return this.repo.findById(id);
    }

    public boolean deleteById(Long id) {
       Optional<Hero> result = this.findById(id);
       if(result.isEmpty()){
        return false;
       }
       this.repo.delete(result.get());
       return true;
    }

    public Optional<Hero> updateById(Long id, UpdateHeroDTO data) throws Exception{
    Optional<Hero> result = this.findById(id);
    if(result.isEmpty()) {
        throw new Exception("Could not find Hero with id " + id);
    }
    Hero foundHero = result.get();
    Optional<Powerstats> foundStats = this.powerRepo.findById(foundHero.getPowerstats().getId());
    Powerstats newStats = foundStats.get();
    newStats.setCombat(data.getCombat());
        newStats.setDurability(data.getDurability());
        newStats.setIntelligence(data.getIntelligence());
        newStats.setPower(data.getPower());
        newStats.setSpeed(data.getSpeed());
        newStats.setStrength(data.getStrength());
        foundHero.setPowerstats(newStats);
        Hero updatedHero = this.repo.save(foundHero);
        return Optional.of(updatedHero);
    }

    

}
