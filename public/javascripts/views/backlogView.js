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
        	column: Sprint.BacklogColumn
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
        window.location="#task/"+ event.currentTarget.id;
    },

    sort_receive: function(event, ui) {
        var task = new Task();
        task = Sprint.Tasks.get(ui.item.context);
        task.set({"insprint": 0});
        task.set({"incolumn": Sprint.BacklogColumn});
        task.save();
        //this.render();
    },

    noass: function() {
        alert("stop en noassig");
    },

    sort_stop: function() {
        var orden = 1;
        var result = $('.sortable_tasks').sortable('toArray');
        var task = new Task();
        _.each(result, function(num) {
            task = Sprint.Tasks.get(num);
            alert("task" + task.get("position") +"orden"+orden);
            if (task.get("position") != orden) {
            	alert("entramos" + orden);
                task.set({"position": orden});
                task.save();
            }
            orden++;
        });
    }
});