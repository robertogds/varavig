Sprint.Views.EditStory = Backbone.View.extend({
    
    events: {
        "submit form": "save"
    },
    
    initialize: function() {
        _.bindAll(this, 'render');
		this.model.bind('change', this.render);
		this.render();
    },
	
	// Generate the attributes for a new Story item.
	newAttributes: function() {
	    return {
		  title: this.$('[name=title]').val(),
		  content: this.$('[name=content]').val(),
	      order:   this.collection.nextOrder(),
	      done:    false
	    };
	},
    
    save: function() {
        var self = this;
        var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";
        this.model.save(this.newAttributes(), {
    
           success: function(model, resp) {
			    //new Sprint.Views.BacklogView();
                //new App.Views.Notice({ message: msg });
                //Backbone.history.saveLocation('story/' + model.id);
				window.location.hash = '#';
            },

            error: function() {
				alert("Error saving user story");
            //    new App.Views.Error();
            }
        });
        
        return false;
    },
    
    render: function() {
	        $(this.el).html(JST.story({ model: this.model }));
	        $('#newstory').html(this.el);
	        // use val to fill in title, for security reasons
	        this.$('[name=title]').val(this.model.get('title'));
	        this.delegateEvents();
    }
});