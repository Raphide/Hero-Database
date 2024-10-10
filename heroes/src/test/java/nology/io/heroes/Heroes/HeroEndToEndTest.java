package nology.io.heroes.Heroes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import nology.io.heroes.Hero.HeroRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class HeroEndToEndTest {

    @LocalServerPort
    private int port;

    @Autowired
    private HeroRepository heroRepository;

    Long heroId;

}
