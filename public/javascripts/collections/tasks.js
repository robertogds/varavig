// User Stories Collection
  // ---------------
  Sprint.Collections.Tasks = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Task,
    
    // Filter down the list of all todo items that are finished.
    //finished: function() {
    //  var tasks_array = this.filter(function(task){ return task.get('left') === 0; });
	//  return new Sprint.Collections.Tasks(tasks_array);
    //},
    
    finished: function() {
  	  return this.tasks_in_column(Sprint.FINISHED_COLUMN);
    },
      
    started: function() {
  	  return this.tasks_in_column(Sprint.STARTED_COLUMN);
    },
    
    not_started: function() {
    	  return this.tasks_in_column(Sprint.NOTSTARTED_COLUMN);
    },
    
    backlog: function() {
    	  return this.tasks_in_column(Sprint.BACKLOG_COLUMN);
    },
    
    // Filter down the list of all todo items that are in the given column.
    tasks_in_column: function(column) {
      var tasks_array = this.filter(function(task){ return task.get('incolumn') === column; });
	  return new Sprint.Collections.Tasks(tasks_array);
    },

    insprint: function(){
      return this.filter(function(task){ return task.get('insprint') > 0 });
    },

    nosprint: function() {
      return this.filter(function(task) { return task.get('insprint') === 0 });  
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('position') + 1;
    },
    parse: function(response) {
        //_.each(response, function(item) {
        //  item.title = "PARSE ITEM" + item.title;
        //})
    return response;
    },

	url :'/task',

    // Todos are sorted by their original insertion order.
    comparator: function(task) {
      return task.get('position');
    }

  });