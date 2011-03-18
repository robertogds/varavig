package controllers;

import models.*;
import notifiers.*;
import play.*;
import play.mvc.*;
import java.util.Collection;
import com.google.gson.Gson;

import play.data.validation.*;
import play.modules.gae.*;
import siena.*;


public class Sprints extends Application {
    
    @Before
    static void checkConnected() {
        if(GAE.getUser() == null) {
            Application.login();
        } else {
            renderArgs.put("user", GAE.getUser().getEmail());
        }
    }
    
    // ~~~~~
		// 
		//     public static void listByProject(Long id) {
		// System.out.println("#Project sprints#" + id );
		//         Collection<Sprint> sprints = Sprint.findByProject(id);
		//         renderJSON(sprints);
		//     }
    
    public static void show(Long id) {
        Sprint sprint = Sprint.findById(id);
        notFoundIfNull(sprint);
		Query<Task> tasks = Task.all().filter("sprint", sprint);
		sprint.tasks = tasks.fetch();
        renderJSON(sprint);
    }
    
    public static void blank() {
        render();
    }
    
    public static void create(@Required String name) {
        if(validation.hasErrors()) {
            flash.error("Oops, please give a name to your new sprint");
            blank();
        }
        String json = params.get("body");
		//TODO: debug instead of println!!
		System.out.println("##" + json );
		Sprint sprint = new Gson().fromJson(json, Sprint.class);
		sprint.insert();
		//tenemos que mandarle a show para que 
		//persista antes del render :(
		show(sprint.id);
    }
    
    public static void destroy(Long id) {
        Sprint list = Sprint.findById(id);
        notFoundIfNull(list);
        list.delete();
        renderJSON("{}");
    }
    
    public static void edit(Long id) {
        Sprint list = Sprint.findById(id);
        notFoundIfNull(list);
        renderJSON(list);
    }
    
    public static void save(Long id, @Required String name, String notes) {
        if(validation.hasErrors()) {
            params.flash();
            flash.error("Oops, please give a name to your list");
            edit(id);
        }
        Sprint list = Sprint.findById(id);
        notFoundIfNull(list);
        list.title = name;
        list.notes = notes;
        list.update();
        show(list.id);
    }

    
}

