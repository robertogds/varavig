package models;

import siena.*;
import play.modules.gae.*;
import java.util.*;
import com.google.appengine.api.users.*;

public class ProjectMember extends Model {

    @Id
    public Long id;
	public Long projectId;
    public Long memberId;

	public static ProjectMember create(Long memberId, Long projectId){	
		ProjectMember projectMember = new ProjectMember();
		projectMember.memberId = memberId;
		projectMember.projectId = projectId;
		projectMember.insert();
		return projectMember;
	}
	
	/*this method must be call when a project is deleted*/
	public static void deleteProject(Long id){
		List<ProjectMember> projectMemberList =  ProjectMember.findByProjectId(id);
		for(ProjectMember pm: projectMemberList){
			pm.delete();
		}
	}
   
    public static Query<ProjectMember> all() {
        return Model.all(ProjectMember.class);
    }
    
    public static ProjectMember findById(Long id) {
        return all().filter("id", id).get();
    }

	public static List<ProjectMember> findByProjectId(Long id) {
        return all().filter("projectId", id).fetch();
    }

	public static List<ProjectMember> findByMemberId(Long id) {
        return all().filter("memberId", id).fetch();
    }

    
}