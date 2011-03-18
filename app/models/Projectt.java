package models;

import java.util.*;
import siena.*;

//No entiendo el motivo pero con project no funciona
public class Projectt extends Model {
	
    @Id
    public Long id;
    public String title;
    public String user;
    public boolean done;
    public Date createdAt;
      
	public List<Sprint> sprints;  
    
    public static Query<Projectt> all() {
        return Model.all(Projectt.class).order("createdAt");
    }

	public static Collection<Projectt> findByUser(String user) {
	        return all().filter("user", user).order("createdAt").fetch();
	}
    
    public static Projectt findById(Long id) {
        return all().filter("id", id).get();
    }
    
    public String toString() {
        return title;
    }
    
}

