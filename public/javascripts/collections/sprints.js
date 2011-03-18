// Sprints Collection
  // ---------------
  Varavig.Collections.Sprints = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Sprint,

	comparator: function(sprint) {
         return sprint.get('title');
    },
	
	
	url :'/sprint'


  });