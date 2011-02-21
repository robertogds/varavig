// This is the view for the backlog column
Sprint.Views.BacklogView = Backbone.View.extend({
	events: {
    "sortstop #sortable":  "prueba"
  },

    initialize: function() {
        this.render();
    },
    
    render: function() {
        $(this.el).html(JST.stories_collection({ collection: this.collection }));
	        $('#items').html(this.el);
	        
			$( "#sortable" ).sortable();
			$( "#sortable" ).disableSelection();
    },
    
    prueba: function() {
	  var orden = 1;
	  var result = $('#sortable').sortable('toArray');
	  var story = new Story();
	  _.each(result, function(num){ 
		story = Sprint.Stories.get(num);
	    var order = story.get("order");
		if (order != orden) {
			story.set({"order": orden});
			story.save();
		}
		 orden++;
	  })
    }
});