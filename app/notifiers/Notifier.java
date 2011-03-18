package notifiers;

import play.mvc.*;
import models.*;

public class Notifier extends Mailer {

    public static void emailList(Projectt project) {
        setFrom(project.user);
        setSubject("Your list: %s", project.title);
        addRecipient(project.user);
        send(project);
    }
    
}

