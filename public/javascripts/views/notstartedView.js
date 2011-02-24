// This is the view for the backlog column
Sprint.Views.NotStartedView = Backbone.View.extend({
	events: {
    "sortstop .nostart":  "sortstop",
    "sortreceive": "receive"
  },

    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(JST.nostart_collection);
        $('#items_nostart').html(this.el);
        $( ".nostart" ).sortable({
			connectWith: ".stories"
		});

        $( ".stories" ).sortable({
			connectWith: ".nostart"
		});
        $( ".nostart" ).disableSelection();
        return this;
    },

    receive: function() {
        alert("entra en receive de not started");
    },

    sortstop: function() {
      alert ("entra en sortstop de notstarted");
    }
});