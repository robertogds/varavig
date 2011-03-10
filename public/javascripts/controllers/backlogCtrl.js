// Controller for the backlog items column
Sprint.Controllers.BacklogCtrl = Backbone.Controller.extend({
    routes: {
        "":              "index",
        "task/:id":      "edit_task",
        "new":           "new_task"
    },

    index: function() {
        Sprint.Tasks.fetch({
            success: function() {
                new Sprint.Views.FinishedView;
                new Sprint.Views.StartedView;
                new Sprint.Views.NotStartedView;
                new Sprint.Views.BacklogView;

            },
            error: function() {
                new Error({ message: "Error loading documents." });
            }
        });
    },

    edit_task: function(id) {
        var task = new Task({ id: id });
        task.fetch({
            success: function(model, resp) {
                new Sprint.Views.EditTask({ model: task });
            },
            error: function() {
                new Error({ message: 'Could not find that document.' });
                window.location.hash = '#';
            }
        });
    },

    new_task: function() {
        var task = new Task();
        task.position = Sprint.Tasks.nextOrder();
        task.done = 0;
        new Sprint.Views.EditTask({ model: task, collection: Sprint.Tasks });

    }

});