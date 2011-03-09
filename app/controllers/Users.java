package controllers;

import java.util.Collection;

import play.modules.gae.GAE;

import models.Task;

public class Users extends Application {
	
	public static void index() {
		//TODO: mostrar un listado de usuarios? tiene sentido?
		renderJSON("{}");
	}
    
	public static void show() {
		if(GAE.getUser() == null) {
			renderJSON("{}");
        } else {
        	renderJSON(GAE.getUser());
        }
	}
}
