package notifiers;

import play.mvc.*;
import models.*;

public class Notifier extends Mailer {

    public static void emailList(Sprint list) {
        setFrom(list.user);
        setSubject("Your list: %s", list.name);
        addRecipient(list.user);
        send(list);
    }
    
}

