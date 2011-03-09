package models;

import java.util.*;
import siena.*;

public class Sprint extends Model {

    @Id
    public Long id;
    
    public String user;
    public String name;
    public String notes;
    public int nextPosition;
    
    @Filter("list")
    public Query<Task> items;
    
    public Sprint(String user, String name) {
        this.user = user;
        this.name = name;
        this.notes = "";
        this.nextPosition = 0;
    }
    
    static Query<Sprint> all() {
        return Model.all(Sprint.class);
    }
    
    public static Sprint findById(Long id) {
        return all().filter("id", id).get();
    }
    
    public static Collection<Sprint> findByUser(String user) {
        return all().filter("user", user).fetch();
    }
    
    public Collection<Task> items() {
        return items.filter("done", false).order("position").fetch();
    }
    
    public Collection<Task> oldItems() {
        return items.filter("done", true).order("-position").fetch();
    }
    
    public String toString() {
        return name;
    }
    
}

