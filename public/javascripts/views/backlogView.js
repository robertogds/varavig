// This is the view for the backlog column
Sprint.Views.BacklogView = Sprint.Views.AbstractPanelView.extend({
    events: {
        "sortstop .sortable_tasks":  "sort_stop",
        "sortreceive": "sort_receive",
        "click .delete_task": "delete_task",
        "click .edit_task": "edit_task"
    },
    	
    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(_.template($('#tasks_collection').html())({
        	collection: Sprint.Tasks ,
        	column: Sprint.BacklogColumn,
			total: this.total_points_left(Sprint.BacklogColumn)
        	}));
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
    	Sprint.Controller.edit_task(event.currentTarget.id);
        //window.location="#task/"+ event.currentTarget.id;
    },

    sort_receive: function(event, ui) {
        var task = new Task();
        task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 0});
        task.set({"incolumn": Sprint.BacklogColumn});
        task.save();
        this.render();
    },

    sort_stop: function() {
        var orden = 1;
        var result = this.$('.sortable_tasks').sortable('toArray');
        var task = new Task();
        _.each(result, function(num) {
            task = Sprint.Tasks.get(num);
            if (task.get("position") != orden) {
                task.set({"position": orden});
                task.save();
            }
            orden++;
        });
    }
});