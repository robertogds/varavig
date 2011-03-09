package models;

import siena.*;

public class Task extends Model {

    @Id
    public Long id;
    
    public String title;
    public String content;
    public String user;
    public boolean done;
    public int insprint;
    public int estimate;
    public int position;
    public int incolumn;
        

    public Task(String title) {
        this.title = title;
        this.done = false;
        this.position = 0;
    }

    
    public static Query<Task> all() {
        return Model.all(Task.class);
    }
    
    public static Task findById(Long id) {
        return all().filter("id", id).get();
    }
    
    
    public String toString() {
        return title;
    }
    
}

