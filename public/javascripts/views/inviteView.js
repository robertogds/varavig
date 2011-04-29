Varavig.Views.InviteView = Backbone.View.extend({
    events: {
        "submit form": "send_invitation"
    },
    
    initialize: function() {
		_.bindAll(this, 'render');
	    this.model.bind('change', this.render);
        this.render();
    },

	form_attributes: function() {
	    return {
		  email: this.$('[name=email]').val(),
	      project_id: this.$('[name=project_id]').val()
	    };
	},
    
    send_invitation: function() {
	    alert("entramos");

        var attributes = this.form_attributes();
		var self = this;
        this.model.save(attributes, {
           success: function(model, resp) {
				self.collection.add(model);
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
    		$(this.el).html(_.template($('#invite_form').html())({ model: this.model }));
	        $('#invite_form_div').html(this.el);
	        this.delegateEvents();
    }
    

});
