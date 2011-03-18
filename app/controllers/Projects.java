package controllers;

import models.*;
import notifiers.*;
import play.*;
import play.mvc.*;
import java.util.Collection;
import com.google.gson.Gson;
import java.util.*;
import play.data.validation.*;
import play.modules.gae.*;
import siena.*;

public class Projects extends Application {
    
    @Before
    static void checkConnected() {
        if(GAE.getUser() == null) {
            Application.login();
        } else {
            renderArgs.put("user", GAE.getUser().getEmail());
        }
    }
    
    public static void index() {
        render();
    }
	
	public static void list() {
	        Collection<Projectt> projects = Projectt.findByUser(GAE.getUser().getEmail());
	        renderJSON(projects);
	}
    
    public static void create() {
		String json = params.get("body");
		//TODO: debug instead of println!!
		System.out.println("##" + json );
		Projectt project = new Gson().fromJson(json, Projectt.class);
		project.user = GAE.getUser().getEmail();
		project.createdAt = new Date();
		project.insert();
		
		//We force the first sprint creation
		Sprint sprint = new Sprint();
		sprint.title = "Sprint 1";
		sprint.project = project;
		sprint.insert();
		
		//tenemos que mandarle a show para que 
		//persista antes del render :(
		show(project.id);
    }

	public static void destroy(Long id) {
        Projectt project = Projectt.findById(id);
        project.delete();
        renderJSON("{}");
	}
	
	public static void show(Long id) {
    	Projectt project = Projectt.findById(id);
		Query<Sprint> sprints = Sprint.all().filter("project", project);
		project.sprints = sprints.fetch();
    	renderJSON(project);
	}
	    
    public static void update() {
    	String json = params.get("body");
		//TODO: debug instead of println!!
		System.out.println("#Update Project#" + json );
    	Projectt project = new Gson().fromJson(json, Projectt.class);
    	project.update();
    	renderJSON("{}");
    }

	public static void email(Long id) {
	    Projectt project = Projectt.findById(id);
	    notFoundIfNull(project);
	    checkOwner(project);
	    Notifier.emailList(project);
	    flash.success("An invitation to this project has been emailed to %s", project.user);
	    index();
	}

	// ~~~~~~ utils

	static String getUser() {
	    return renderArgs.get("user", String.class);
	}

	static void checkOwner(Projectt project) {
	    if(!getUser().equals(project.user)) {
	        forbidden();
	    }
	}
    
}

