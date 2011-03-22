package models;

import java.util.*;
import siena.*;

//No entiendo el motivo pero con project no funciona
public class Projectt extends Model {
	
    @Id
    public Long id;
    public String title;
    public boolean done;
    public Date createdAt;
      
	public List<Sprint> sprints;  
    
    public static Query<Projectt> all() {
        return Model.all(Projectt.class).order("createdAt");
    }

	public static Collection<Projectt> findByMember(String email) {
			Member member = Member.findByEmail(email);
			System.out.println("##" + member.toString() );
			List<ProjectMember> projectMemberList = ProjectMember.findByMemberId(member.id);
			System.out.println("##" + projectMemberList.size() );
	        return findProjectFromIdList(projectMemberList);
	}
    
    public static Projectt findById(Long id) {
        return all().filter("id", id).get();
    }
    
    public String toString() {
        return title;
    }

	static Collection<Projectt> findProjectFromIdList(List<ProjectMember> projectMemberList){
		List<Projectt> projectList = new ArrayList();
		for (ProjectMember projectMember : projectMemberList){
			Projectt project = Projectt.findById(projectMember.projectId);
			projectList.add(project);
		}
		return projectList;
	}
    
}

