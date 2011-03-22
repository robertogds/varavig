package controllers;

import java.util.Collection;

import play.modules.gae.GAE;
import models.*;

public class Members extends Application {
		
	public static void index() {
		//TODO: mostrar un listado de usuarios? tiene sentido?
		renderJSON("{}");
	}
    
	public static void show() {
		if(GAE.getUser() == null) {
			renderJSON("{}");
        } else {
			Member member = getCurrentMember();
        	renderJSON(member);
        }
	}
	
	public static Member create(String email) {
		Member member = new Member();
		member.email = email; 
		member.insert();
		return member;
    }

	public static Member getCurrentMember(){
		return Member.findByEmail(GAE.getUser().getEmail());
	}
 
}
