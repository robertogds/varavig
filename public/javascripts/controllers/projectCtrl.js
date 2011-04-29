// Controller for the projects
Varavig.Controllers.ProjectCtrl = Backbone.Controller.extend({
	_user: null,
	_projects: null,
	_index_view: null,
	_user_area_view: null,
	_sprints: null,
	_tasks: null,
	
    routes: {
        "":              									"index",
        "new":           									"new_project",
		"project/:id":   									"show_project",
		"project/:project_id/sprint/:sprint_id":    		"show_sprint",
		"project/:project_id/sprint/:id/new_task":  		"new_task"
    },

     initialize: function(data) {
         this._user = data.user;
		 Varavig.User = this._user;
         this._projects = data.projects;
		 this._sprints =  new Varavig.Collections.Sprints();

		//create user area view with projects and user into
		 this._user_area_view = new Varavig.Views.UserAreaView({model: this._user, collection: this._projects});
         this._index = new Varavig.Views.ProjectListView({collection: this._projects });

     	return this;
     },
	
    index: function() {
	   	this._index.render();
    },

    new_project: function() {
        var project = new Project();
        new Varavig.Views.EditProject({ model: project, collection: this._projects });

    },

	show_project: function(id){
		//TODO if project doesnt exist we should inform
		var project = this._projects.get(id);
		
		//set current project in the user area
		this._user_area_view.set_current_project(project);
		
		//If already define we avoid fetching data again
        if (_.isUndefined(project._view)) {
			var self = this;
			project.fetch({
	            success: function(){
					var sprints = new Varavig.Collections.Sprints(project.get("sprints"));
	                project._view = new Varavig.Views.SprintListView({ collection: sprints });
					project._view.render();
	            },
	            error: function() {
	                new Error({ message: "Error loading projects." });
	            }
	        });
        } else {
			project._view.render();
		}
	},
	
	show_sprint: function(project_id, sprint_id){
		var sprint = this._sprints.get(sprint_id);
		if (_.isUndefined(sprint)) {
			sprint = new Sprint({ id: sprint_id });	
			this._sprints.add(sprint);
		}
		//If already define we avoid fetching data again
        if (_.isUndefined(sprint._view)) {	
			var self = this;
			sprint.fetch({
	           	success: function(){
					self._tasks = new Varavig.Collections.Tasks(sprint.get("tasks"));
					//We need to calculate the percentaje before rendering tasks
					self._tasks.parse_percentaje();
					sprint._view = new Varavig.Views.SprintPanelView({ model: sprint, collection: self._tasks});
					sprint._view.render();
	            },
	            error: function() {
	                new Error({ message: "Error loading tasks." });
	            }	
		    });
		}
		else{
			sprint._view.render();
		}
	},
	
	new_task: function(project_id, sprint_id) {
		var sprint = new Sprint({ id: sprint_id });
        var task = new Task({sprint: sprint});
		
        new Varavig.Views.EditTask({ model: task, collection: this._tasks});

    }

});