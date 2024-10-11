package nology.io.heroes.Heroes;

import static io.restassured.RestAssured.given;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import static org.hamcrest.Matchers.*;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import nology.io.heroes.Hero.CreateHeroDTO;
import nology.io.heroes.Hero.Hero;
import nology.io.heroes.Hero.HeroRepository;
import nology.io.heroes.Images.Images;
import nology.io.heroes.PowerStats.Powerstats;
import nology.io.heroes.PowerStats.PowerstatsRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class HeroEndToEndTest {

    @LocalServerPort
    private int port;

    @Autowired
    private HeroRepository heroRepository;

    @Autowired
    private PowerstatsRepository powerstatsRepository;

    Long heroId;

    @BeforeEach
    public void setup(){
        RestAssured.port = port;
        heroRepository.deleteAll();
        powerstatsRepository.deleteAll();

        Hero hero1 = new Hero();
        Powerstats stats1 = new Powerstats();
        Images images1 = new Images();
        hero1.setName("Mr. Test");
        stats1.setCombat(10);
        stats1.setDurability(20);
        stats1.setIntelligence(30);
        stats1.setPower(40);
        stats1.setSpeed(50);
        stats1.setStrength(60);
        images1.setSm("image");
        hero1.setPowerstats(stats1);
        hero1.setImages(images1);
        heroRepository.save(hero1);
        heroId = hero1.getId();

        Hero hero2 = new Hero();
        Powerstats stats2 = new Powerstats();
        Images images2 = new Images();
        hero2.setName("The Indomitable Test");
        stats2.setCombat(100);
        stats2.setDurability(50);
        stats2.setIntelligence(60);
        stats2.setPower(75);
        stats2.setSpeed(20);
        stats2.setStrength(90);
        images2.setSm("placeholder");
        hero2.setPowerstats(stats2);
        hero2.setImages(images2);
        heroRepository.save(hero2);

    }

    @Test
    public void getAllHeroes(){
        given().when().get("/heroes").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(2)).body("name", hasItems("Mr. Test", "The Indomitable Test")).body("powerstats.combat", hasItems(10, 100)).body("powerstats.durability", hasItems(20, 50)).body("powerstats.intelligence", hasItems(30, 60)).body("powerstats.power", hasItems(40, 75)).body("powerstats.speed", hasItems(50, 20)).body("powerstats.strength", hasItems(60, 90)).body("images.sm", hasItems("image", "placeholder"));
    }

    @Test
    public void getHeroById() {
        given().when().get("heroes/{id}", heroId).then().statusCode(HttpStatus.OK.value()).body("name", equalTo("Mr. Test"));
    }

    @Test
    public void createHero_success(){
        CreateHeroDTO data = new CreateHeroDTO();
        data.setName("Success Girl");
        data.setCombat(30);
        data.setDurability(50);
        data.setIntelligence(85);
        data.setPower(60);
        data.setSpeed(5);
        data.setStrength(95);
        data.setSm("picture");
        given().contentType(ContentType.JSON).body(data).when().post("/heroes").then().statusCode(HttpStatus.CREATED.value()).body("name", equalTo("Success Girl"));

        given().when().get("/heroes").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(3)).body("name", hasItems("Mr. Test", "The Indomitable Test", "Success Girl")).body("powerstats.speed", hasItems(50, 20, 5)).body("images.sm", hasItems("image", "placeholder", "picture"));
    }

    @Test
    public void createHero_missingStats_failure(){
        CreateHeroDTO data = new CreateHeroDTO();
        data.setName("Failure Boy");
        data.setSm("jaypeg");
        given().contentType(ContentType.JSON).body(data).when().post("/heroes").then().statusCode(HttpStatus.BAD_REQUEST.value());

        given().when().get("/heroes").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(2));
    }

    @Test
    public void createHero_invalidStats_failure(){
        CreateHeroDTO data = new CreateHeroDTO();
        data.setName("Failure Boy");
        data.setCombat(110);
        data.setDurability(90);
        data.setIntelligence(0);
        data.setPower(20);
        data.setSpeed(200);
        data.setStrength(150);
        data.setSm("Jaypeg");
        given().contentType(ContentType.JSON).body(data).when().post("/heroes").then().statusCode(HttpStatus.BAD_REQUEST.value());

        given().when().get("/heroes").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(2));
    }

    @Test
    public void deleteHeroById_success(){
        given().when().delete("/heroes/{id}", heroId).then().statusCode(HttpStatus.NO_CONTENT.value());

        given().when().get("/heroes").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(1));
    }

    @Test
    public void deleteHeroById_noSuchId_failure(){
        given().when().delete("/heroes/{id}", 200L).then().statusCode(HttpStatus.NOT_FOUND.value());

        given().when().get("/heroes").then().statusCode(HttpStatus.OK.value()).body("$", hasSize(2));
    }

}
