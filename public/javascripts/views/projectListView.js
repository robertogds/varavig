// This is the view for the started column.
Varavig.Views.ProjectListView = Backbone.View.extend({
	events: {
        "click .delete_project": "delete_project"
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(_.template($('#projects_collection').html())({ 
        	collection: Varavig.Projects
			}));
	    $('#projects').html(this.el);
	    this.jquery_editable();
        this.delegateEvents();
        return this;
    },

	jquery_editable: function() {
        this.$("#project_title").editable(this.submit_edit, { 
            indicator : "Saving...",
            tooltip   : "Click to edit...",
            name : "title",
            id   : this.$(".portlet").attr("id"),
            type : "text"
        });

    },

	delete_project: function(event){
        var project = new Project();
        project = Varavig.Projects.get(event.currentTarget.id);
        Varavig.Projects.remove(project);
        project.destroy();
        this.render();
    },

	submit_edit : function (value, settings){ 
    	var project = new Project();
        project = Varavig.Projects.get(settings.id);
        switch (settings.name) {
	        case 'title':
	        	project.save({"title" : value });
	           break;
        } 
		return(value);
	}

});