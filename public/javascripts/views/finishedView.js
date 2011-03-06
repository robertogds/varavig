// This is the view for the finished column
Sprint.Views.FinishedView = Backbone.View.extend({
	events: {
    "sortstop #finished_list":  "sortstop",
    "sortreceive": "receive"
  },

    initialize: function() {
        this.render();
    },

    render: function() {
	    $(this.el).html(JST.finished_collection({ collection: Sprint.Tasks }));
        $('#items_finished').html(this.el);
        this.jquery_task();
        return this;
    },

    jquery_task: function() {
        $("#finished_list").sortable({
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
         $("#finished_list").disableSelection();
    },

    receive: function(event,ui) {
	    var task = new Task();
	    task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 1});
        task.set({"incolumn": 3});
	    task.save();
    },

    sortstop: function() {
	   // I think is better dont mantain the order in this column
    }
});