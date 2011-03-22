package controllers;

import play.mvc.*;
import play.modules.gae.*;
import models.*;
import com.google.appengine.api.users.*;

public class Application extends Controller {

    public static void index() {
        if(GAE.isLoggedIn()) {
			if (!checkMembersExists()){
				Members.create(GAE.getUser().getEmail());
			}
            Projects.index();
        }
        render();
    }
    
    public static void login() {
        GAE.login("Application.index");
    }
    
    public static void logout() {
        GAE.logout("Application.index");
    }

	static Boolean checkMembersExists() {
		Member member = Member.findByEmail(GAE.getUser().getEmail());
	    return member != null;
	}

}