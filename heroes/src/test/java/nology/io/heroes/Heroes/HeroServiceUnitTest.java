package nology.io.heroes.Heroes;

import static io.restassured.RestAssured.when;
import static org.hamcrest.Matchers.instanceOf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.aspectj.lang.annotation.After;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import jakarta.validation.ValidationException;
import nology.io.heroes.Hero.CreateHeroDTO;
import nology.io.heroes.Hero.Hero;
import nology.io.heroes.Hero.HeroRepository;
import nology.io.heroes.Hero.HeroService;
import nology.io.heroes.Images.Images;
import nology.io.heroes.Images.ImagesRepository;
import nology.io.heroes.PowerStats.Powerstats;
import nology.io.heroes.PowerStats.PowerstatsRepository;

public class HeroServiceUnitTest {

    @Mock
    private HeroRepository repo;

    @Mock
    private PowerstatsRepository powerRepo;

    @Mock
    private ImagesRepository imageRepo;

    @Spy
    @InjectMocks
    private HeroService service;

    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void findAll() {
        service.findAll();
        verify(repo).findAll();
    }

    @Test
    public void findById(){
        Long heroId = 1L;
        service.findById(heroId);
        verify(repo).findById(heroId);
    }

    @Test
    public void createHero_success() throws Exception {
        CreateHeroDTO mockDTO = new CreateHeroDTO();
        Hero mockHero = new Hero();
        // Powerstats newStats = new Powerstats();
        // Images images = new Images();
        // mockDTO.setName("Testman");
        // mockDTO.setCombat(10);
        // mockDTO.setDurability(20);
        // mockDTO.setIntelligence(30);
        // mockDTO.setPower(40);
        // mockDTO.setSpeed(50);
        // mockDTO.setStrength(60);
        // mockDTO.setSm("picture");
        // newStats.setCombat(mockDTO.getCombat());
        // newStats.setDurability(mockDTO.getDurability());
        // newStats.setIntelligence(mockDTO.getIntelligence());
        // newStats.setPower(mockDTO.getPower());
        // newStats.setSpeed(mockDTO.getSpeed());
        // newStats.setStrength(mockDTO.getStrength());
        // images.setSm(mockDTO.getSm());
        // mockHero.setName(mockDTO.getName());
        // mockHero.setPowerstats(newStats);
        // mockHero.setImages(images);
        when(service.createHero(mockDTO)).thenReturn(mockHero);
        // when(powerRepo.save(any(Powerstats.class))).thenReturn(newStats);
        // when(imageRepo.save(any(Images.class))).thenReturn(images);
        when(repo.save(any(Hero.class))).thenReturn(mockHero);
        // Hero heroResult = service.createHero(mockDTO);
        // assertTrue(heroResult.equals(mockHero));
        // assertNotNull(heroResult);
        // assertEquals(mockHero, heroResult);
        // assertSame(mockHero, heroResult);
        verify(repo).save(any(Hero.class));

    }

    @Test
    public void createHero_invalidStats_failure() throws Exception {
        CreateHeroDTO mockDTO = new CreateHeroDTO();
        Hero mockHero = new Hero();
        Powerstats newStats = new Powerstats();
        Images images = new Images();
        mockDTO.setName("Testman");
        mockDTO.setCombat(101);
        mockDTO.setDurability(200);
        mockDTO.setIntelligence(30);
        mockDTO.setPower(40);
        mockDTO.setSpeed(50);
        mockDTO.setStrength(60);
        mockDTO.setSm("picture");
        // newStats.setCombat(mockDTO.getCombat());
        // newStats.setDurability(mockDTO.getDurability());
        // newStats.setIntelligence(mockDTO.getIntelligence());
        // newStats.setPower(mockDTO.getPower());
        // newStats.setSpeed(mockDTO.getSpeed());
        // newStats.setStrength(mockDTO.getStrength());
        // images.setSm(mockDTO.getSm());
        // mockHero.setName(mockDTO.getName());
        // mockHero.setPowerstats(newStats);
        // mockHero.setImages(images);
        when(service.createHero(mockDTO)).thenReturn(mockHero);
        // when(powerRepo.save(any(Powerstats.class))).thenReturn(newStats);
        // when(imageRepo.save(any(Images.class))).thenReturn(images);
        // assertThrows(Exception.class, () -> service.createHero(mockDTO));
        // Hero heroResult = service.createHero(mockDTO);
        // assertTrue(heroResult.equals(mockHero));
        // assertNotNull(heroResult);
        // assertEquals(mockHero, heroResult);
        // assertSame(mockHero, heroResult);
        verify(repo, never()).save(any());

    }

//     @AfterEach
// public void tearDown() {
//     Mockito.reset(repo);
// }

}
