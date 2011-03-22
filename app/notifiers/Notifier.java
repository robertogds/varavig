package notifiers;

import play.mvc.*;
import models.*;

public class Notifier extends Mailer {

    public static void sendInvitation(Projectt project, String email, Member currentMember) {
        setFrom(currentMember.email);
        setSubject("You've been invite to work on %s", project.title);
        addRecipient(email);
        send(project);
    }
    
}

