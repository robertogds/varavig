package controllers;

import java.util.Collection;

import models.Task;
import play.modules.gae.GAE;
import play.mvc.Before;

import com.google.gson.Gson;

public class Tasks extends Application {
    
    @Before
    static void checkConnected() {
        if(GAE.getUser() == null) {
            Application.login();
        } else {
            renderArgs.put("user", GAE.getUser().getEmail());
        }
    }

	public static void index() {
	        Collection<Task> stories = Task.all().fetch();
	        renderJSON(stories);
	}
	    
    public static void show(Long id) {
    	Task item = Task.findById(id);
    	renderJSON(item);
	}
	    
	public static void create() {
		String json = params.get("body");
		//TODO: debug instead of println!!
		System.out.println("##" + json );
		Task task = new Gson().fromJson(json, Task.class);
		task.left = task.estimate;
		task.insert();
		//tenemos que mandarle a show para que 
		//persista antes del render :(
		show(task.id);
	}
	    
	public static void destroy(Long id) {
        Task item = Task.findById(id);
        item.delete();
        renderJSON("{}");
	}
	    
    public static void update() {
    	String json = params.get("body");
		//TODO: debug instead of println!!
		System.out.println("##" + json );
    	Task item = new Gson().fromJson(json, Task.class);
    	item.update();
    	renderJSON("{}");
    }
    
}

