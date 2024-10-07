package nology.io.heroes.Images;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import nology.io.heroes.Hero.Hero;

@Entity
@Table(name = "images")
public class Images {

    public Images(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column
    private String xs;

    @Column
    private String sm;

    @Column
    private String md;

    @Column
    private String lg;

    @OneToOne(mappedBy = "images")
    private Hero hero;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getXs() {
        return xs;
    }

    public void setXs(String xs) {
        this.xs = xs;
    }

    public String getSm() {
        return sm;
    }

    public void setSm(String sm) {
        this.sm = sm;
    }

    public String getMd() {
        return md;
    }

    public void setMd(String md) {
        this.md = md;
    }

    public String getLg() {
        return lg;
    }

    public void setLg(String lg) {
        this.lg = lg;
    }

    // public Hero getHero() {
    //     return hero;
    // }

    // public void setHero(Hero hero) {
    //     this.hero = hero;
    // }

    

}
