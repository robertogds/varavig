// This is the view for the backlog column
Sprint.Views.BacklogView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    
    render: function() {
        $(this.el).html(JST.stories_collection({ collection: this.collection }));
	        $('#items').html(this.el);
    }
});