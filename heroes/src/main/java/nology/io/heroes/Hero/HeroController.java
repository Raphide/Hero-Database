package nology.io.heroes.Hero;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import nology.io.heroes.common.exceptions.NotFoundException;

@RestController
@RequestMapping("heroes")
public class HeroController {

    @Autowired
    private HeroService heroService;

    @PostMapping
    public ResponseEntity<Hero> createHero(@Valid @RequestBody CreateHeroDTO data) throws Exception{
        Hero createdHero = this.heroService.createHero(data);
        return new ResponseEntity<Hero>(createdHero, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Hero>> findAllHeroes(){
        List<Hero> heroes = this.heroService.findAll();
        return new ResponseEntity<List<Hero>>(heroes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hero> findHeroById(@PathVariable Long id) throws Exception {
        Optional<Hero> result = this.heroService.findById(id);
        Hero foundHero = result.orElseThrow(() -> new NotFoundException("Could not find Hero with id " + id));
        return new ResponseEntity<>(foundHero, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHeroById(@PathVariable Long id) throws NotFoundException{
        boolean deleteSuccessful = this.heroService.deleteById(id);
        if(deleteSuccessful == false) {
            throw new NotFoundException("Could not find Hero with id " + id);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Hero> updateHeroById(@PathVariable Long id, @RequestBody UpdateHeroDTO data) throws Exception{
        Optional<Hero> result = this.heroService.updateById(id, data);
        Hero foundHero = result.orElseThrow(() -> new NotFoundException("Could not find Hero with id " + id));
        return new ResponseEntity<>(foundHero, HttpStatus.OK);
    }



}
