// This is the view for the started column.
Varavig.Views.UserAreaView = Backbone.View.extend({
	_current_project:  null,
	
    initialize: function() {
		this.model.bind('all', _.bind(this.render, this));
		this.collection.bind('all', _.bind(this.render, this));
		this.render();
    },
	
	set_current_project: function(project){
		this._current_project = project;
		this.render();
	},

    render: function() {
        $(this.el).html(_.template($('#user_area_tmp').html())({ 
			model : this.model,
        	collection: this.collection,
			current_project: this._current_project
		}));
	    $('#user_area').html(this.el);
		//TODO esto no deberia estar aqui
		$('#gravatar').gravatarImg(this.model.get("email"),'?s=37&d=mm');
        this.delegateEvents();
        return this;
    }
	

});