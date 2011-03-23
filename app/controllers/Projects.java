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
	        Collection<Projectt> projects = Projectt.findByMember(GAE.getUser().getEmail());
	        renderJSON(projects);
	}
    
    public static void create() {
		String json = params.get("body");
		//TODO: debug instead of println!!
		System.out.println("##" + json );
		Projectt project = new Gson().fromJson(json, Projectt.class);
		project.createdAt = new Date();
		project.insert();
		
		//Create the ownership of the project by member
		ProjectMember.create(Members.getCurrentMember().id,project.id);
		
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
		//this will delete the reference to user projects
		ProjectMember.deleteProject(id);
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

	public static void inviteColaborator(Long id, String email) {
		System.out.println("#Projects.inviteColaborator#" + email );
	    Projectt project = Projectt.findById(id);
	    notFoundIfNull(project);
	    checkOwner(project);
		//Add colaborator to project before sending the email
		addColaboratorToProject(email,project);
		//Send email notification
	    Notifier.sendInvitation(project, email, Members.getCurrentMember());
	    flash.success("An invitation to this project has been emailed to %s", email);
	    index();
	}

	// ~~~~~~ utils
	static void addColaboratorToProject(String email, Projectt project){
		Member colaborator = Members.create(email);
		//Create the ownership of the project by member
		ProjectMember.create(colaborator.id, project.id);		
	}
	
	static String getUser() {
	    return renderArgs.get("user", String.class);
	}

	static void checkOwner(Projectt project) {
		List<ProjectMember> projectMemberList = ProjectMember.findByProjectId(project.id);
		Member member = Members.getCurrentMember();
		Boolean isOwner = Boolean.FALSE;
		for (ProjectMember projectMember: projectMemberList){
			if (member.id == projectMember.memberId){
				isOwner = Boolean.TRUE;
				break;
			}
		}
	    if(!isOwner ) {
	         forbidden();
	    }
	}
    
}

