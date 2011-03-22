// This is the view for the started column.
Varavig.Views.ProjectListView = Backbone.View.extend({
	events: {
        "click .delete_project": "delete_project"
    },

    initialize: function() {
        //TODO esto no fnciona, pq?
		//_.bindAll(this, 'render');
		//this.model.bind('all', this.render);
    },

    render: function() {
        $(this.el).html(_.template($('#projects_collection').html())({ 
        	collection: this.collection
			}));
	    $('#main_container').html(this.el);
	    //this.jquery_editable();
        this.delegateEvents();
        return this;
    },

	delete_project: function(event){
        var project = new Project();
        project = this.collection.get(event.currentTarget.id);
        this.collection.remove(project);
        project.destroy();
        this.render();
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

	submit_edit : function (value, settings){ 
    	var project = new Project();
        project = this.collection.get(settings.id);
        switch (settings.name) {
	        case 'title':
	        	project.save({"title" : value });
	           break;
        } 
		return(value);
	}
	

});