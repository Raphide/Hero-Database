package nology.io.heroes.Appearance;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "appearance")
public class Appearance {

    public Appearance(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column
    private String gender;

    @Column
    private String race;

    @Column
    private String[] height;

    @Column
    private String[] weight;
}
