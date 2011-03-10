// This is the view for the backlog column
Sprint.Views.AbstractPanelView = Backbone.View.extend({
        events: {
        "sortstop .sortable_tasks":  "sort_stop",
        "sortreceive": "sort_receive",
        "click .delete_task": "delete_task",
        "click .edit_task": "edit_task"
    },

    jquery_task: function() {
        this.$(".sortable_tasks").sortable({
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
        this.$(".sortable_tasks").disableSelection();
    },

    delete_task: function(event){
        var task = new Task();
        task = Sprint.Tasks.get(event.currentTarget.id);
        Sprint.Tasks.remove(task);
        task.destroy();
        this.render();
    },

    edit_task: function(event){
    	//Sprint.Controller.edit_task(event.currentTarget.id);
        window.location="#task/"+ event.currentTarget.id;
    },

    total_points_left: function(column){
		var total = 0;
		var tasks = Sprint.Tasks.filter(function(task) {
		  return task.get("incolumn") === column;
		});
       for (i = 0, l = tasks.length; i < l; i++){
			total += tasks[i].get("left");
        };
		return total;
	} 
    
});