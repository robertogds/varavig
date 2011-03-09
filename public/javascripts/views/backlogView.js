// This is the view for the backlog column
Sprint.Views.BacklogView = Backbone.View.extend({
    events: {
        "sortstop #tasks":  "sortstop",
        "sortreceive": "receive",
        "click .delete_task": "delete_task",
        "click .edit_task": "edit_task"
    },

    initialize: function() {
        this.render();
    },

    render: function() {
    	
        $(this.el).html(_.template($('#tasks_collection').html())({ collection: Sprint.Tasks }));
        $('#items').html(this.el);
        this.jquery_task();
        this.delegateEvents();
        return this;
    },

    delete_task: function(event){
        var task = new Task();
        task = Sprint.Tasks.get(event.currentTarget.id);
        Sprint.Tasks.remove(task);
        task.destroy();
        this.render();
    },

    edit_task: function(event){
        window.location="#task/"+ event.currentTarget.id;
    },

    jquery_task: function() {
        $("#tasks").sortable({
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
        $("#tasks").disableSelection();
    },

    receive: function(event, ui) {
        var task = new Task();
        task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 0});
        task.set({"incolumn": 0});
        task.save();
        //this.render();
    },

    noass: function() {
        alert("stop en noassig");
    },
    


    sortstop: function() {
        var orden = 1;
        var result = $('#tasks').sortable('toArray');
        var task = new Task();
        _.each(result, function(num) {
            task = Sprint.Tasks.get(num);
            if (task.get("position") != orden) {
                task.set({"position": orden});
                task.save();
            }
            orden++;
        })
    }
});