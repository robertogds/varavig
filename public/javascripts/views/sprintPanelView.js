// This is the view for the backlog column
Varavig.Views.SprintPanelView = Backbone.View.extend({
    	
    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(_.template($('#sprint_panel').html())({
        	sprint: this.model 
        }));
        $('#main_container').html(this.el);
        this.delegateEvents();
        return this;
    },

});