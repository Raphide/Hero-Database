package nology.io.heroes.Hero;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

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



}
