Varavig.Views.EditProject = Backbone.View.extend({
    events: {
        "submit form": "save"
    },
    
    initialize: function() {
	    //_.bindAll(this, 'render');
		//this.model.bind('all', this.render);
		this.render();
    },

	// Generate the attributes for a new Project
	newAttributes: function() {
	    return {
		  title: this.$('[name=title]').val(),
	      done:    false
	    };
	},

    editAttributes: function() {
	    return {
		  title: this.$('[name=title]').val(),
	    };
	},
    
    save: function() {
        var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";
        var attributes = this.editAttributes();
        if (this.model.isNew()) { attributes = this.newAttributes(); }
        this.model.save(attributes, {
           success: function(model, resp) {
				 window.location.hash = '#';
				 //Backbone.history.saveLocation('#');
            },
            error: function(model,e) {
				alert(e);
            }
        });
        
        return false;
    },

    render: function() {
    		$(this.el).html(_.template($('#project').html())({ model: this.model }));
	        $('#main_container').html(this.el);
	        // use val to fill in title, for security reasons
	        this.$('[name=title]').val(this.model.get('title'));
	        this.delegateEvents();
    }
});
