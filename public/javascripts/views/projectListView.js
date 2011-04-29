// This is the view for the started column.
Varavig.Views.ProjectListView = Backbone.View.extend({
	events: {
        "click .delete_project": "delete_project",
		"click .invite_link": 	"show_invitation_form",
		"click .cancel_invite": "hide_invitation_form"
    },

    initialize: function() {
		this.collection.bind('all', _.bind(this.render, this));
    },

    render: function() {
        $(this.el).html(_.template($('#projects_collection').html())({ 
        	collection: this.collection
			}));
	    $('#main_container').html(this.el);
        this.delegateEvents();
        return this;
    },

	delete_project: function(event){
        var project = new Project();
        project = this.collection.get(event.currentTarget.id);
        this.collection.remove(project);
        project.destroy();
    },

	submit_edit : function (value, settings){ 
    	var project = new Project();
        project = this.collection.get(settings.id);
        switch (settings.name) {
	        case 'title':
	        	project.save({"title" : value });
	           break;
        } 
		return(value);
	},
	
    show_invitation_form: function (event){
		var link = $(event.currentTarget);
		var form = link.parents('.project').find('.invite');
		form.show();
	},
	
	hide_invitation_form: function (event){
		var link = $(event.currentTarget);
		var form = link.parents('.project').find('.invite');
		form.hide();
	}
    
   
});