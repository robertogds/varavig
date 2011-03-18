package models;

import java.util.*;
import siena.*;

public class Sprint extends Model {

    @Id
    public Long id; 
    public String title;
    public String notes;  
     
	@Index("project_index")
	public Projectt project;
	
    public List<Task> tasks;

    public static Query<Sprint> all() {
        return Model.all(Sprint.class);
    }
    
    public static Sprint findById(Long id) {
        return all().filter("id", id).get();
    }
    
    public String toString() {
        return title;
    }
    
}
