Varavig.Views.InviteView = Backbone.View.extend({
    events: {
        "clic .send_invitation": "send_invitation"
    },
    
    initialize: function() {
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

		// var jqxhr = $.getJSON("/invite/" + attributes.get("email") + "/" + attributes.get("project_id"), function() {
		//   alert("success");
		// })
		// .success(function() { alert("second success"); })
		// .error(function() { alert("error"); })
		// .complete(function() { alert("complete"); });

		
		$.ajax({
		  type: "POST",
		  url: "/invite/" + attributes.get("email") + "/" + attributes.get("project_id"),
		  context: document.body,
		  success: function(){
		    alert("fue bien dicen");
			window.location.hash = '#';
		  }	,
		            error: function(e) {
				alert(e);
		            //    new App.Views.Error();
		            }
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
