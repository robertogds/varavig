package models;

import siena.*;
import play.modules.gae.*;
import java.util.*;
import com.google.appengine.api.users.*;

public class Member extends Model {

    @Id
    public Long id;
    public String email;
    public String gravatar;
   
         
    public static Query<Member> all() {
        return Model.all(Member.class);
    }
    
    public static Member findById(Long id) {
        return all().filter("id", id).get();
    }

    public static Member findByEmail(String email) {
        return all().filter("email", email).get();
    }
    
    public String toString() {
        return email;
    }
    
}

