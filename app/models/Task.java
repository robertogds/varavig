package models;

import siena.*;

public class Task extends Model {

    @Id
    public Long id;
    
    public String title;
    public String content;
    public String user;
    public String gravatar;
    public boolean done;
    public int estimate;
    public int left;
    public int position;
    public int incolumn;
    public boolean blocked;

	@Index("sprint_index")
	public Sprint sprint;
         
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

