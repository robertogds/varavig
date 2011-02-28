// User Stories Collection
  // ---------------
  Sprint.Collections.Tasks = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Task,

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(task){ return task.get('done'); });
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
      return this.last().get('order') + 1;
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