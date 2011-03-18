// Controller for the backlog items column
Varavig.Controllers.BacklogCtrl = Backbone.Controller.extend({
    routes: {
        "":              "index",
        "task/:id":      "edit_task",
        "new":           "new_task"
    },

    index: function() {
        Varavig.Tasks.fetch({
            success: function() {
                new Varavig.Views.FinishedView;
                new Varavig.Views.StartedView;
                new Varavig.Views.NotStartedView;
                new Varavig.Views.BacklogView;

            },
            error: function() {
                new Error({ message: "Error loading tasks." });
            }
        });
    },

    edit_task: function(id) {
        var task = new Task({ id: id });
        task.fetch({
            success: function(model, resp) {
                new Varavig.Views.EditTask({ model: task });
            },
            error: function() {
                new Error({ message: 'Could not find that task.' });
                window.location.hash = '#';
            }
        });
    },

    new_task: function() {
        var task = new Task();
        task.position = Varavig.Tasks.nextOrder();
        task.done = 0;
        new Varavig.Views.EditTask({ model: task, collection: Varavig.Tasks });

    }

});