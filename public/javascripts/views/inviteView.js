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

		var send_invitation = function() {
		            return $.ajax({
						type: "POST",
		                url: '/invite/' + attributes.get("email") + '/' + attributes.get("project_id"),
		                data: {},
		                contentType: "application/json; charset=utf-8",
		                dataType: "json"
		            });
		        };

        $.when(send_invitation()).then(function(data) {
            alert("eeeo");
		});

		
		alert("antes de salir");
		return false;      
    },

    render: function() {
    		$(this.el).html(_.template($('#invite_form').html())({ model: this.model }));
	        $('#invite_form_div').html(this.el);
	        this.delegateEvents();
    }
});
