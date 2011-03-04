// This is the view for the backlog column
Sprint.Views.NotStartedView = Backbone.View.extend({
    events: {
        "sortstop #notstarted_list":  "sortstop",
        "sortreceive": "receive"
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(JST.nostart_collection({ collection: Sprint.Tasks }));
        $('#items_nostart').html(this.el);
        $("#notstarted_list").sortable({
            connectWith: ".subcolumn"
        });
        $("#notstarted_list").disableSelection();

        return this;
    },

    receive: function(event, ui) {
        var task = new Task();
        task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint":1});
        task.set({"incolumn":1});
        task.save();
    },

    sortstop: function() {
        // I think is better dont mantain the order in this column
    }
});