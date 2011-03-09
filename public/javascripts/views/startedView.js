// This is the view for the started column
Sprint.Views.StartedView = Backbone.View.extend({
	events: {
    "sortstop #started_list":  "sortstop",
    "sortreceive": "receive"
  },

    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(_.template($('#started_collection').html())({ collection: Sprint.Tasks }));
	    $('#items_started').html(this.el);
        this.jquery_task();
        return this;
    },

    jquery_task: function() {
        $("#started_list").sortable({
            connectWith: ".subcolumn"
        });

        this.$(".portlet").addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
                .find(".portlet-header")
                .addClass("ui-widget-header ui-corner-all")
                .prepend("<span class='ui-icon ui-icon-minusthick'></span>")
                .end()
                .find(".portlet-content");

        this.$(".portlet-header .ui-icon").click(function() {
            $(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
            $(this).parents(".portlet:first").find(".portlet-content").toggle();
        });
         $("#started_list").disableSelection();
    },

    receive: function(event,ui) {
	    var task = new Task();
	    task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 1});
        task.set({"incolumn": 2});
        task.set({"user": Sprint.User.get("email")});
	    task.save();
	    this.render();
    },

    sortstop: function() {
	   // I think is better dont keep the order in this column
    }
});