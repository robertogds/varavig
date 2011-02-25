// User Stories Collection
  // ---------------
  Sprint.Collections.Stories = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Story,

    // Filter down the list of all todo items that are finished.
    done: function() {
      return this.filter(function(story){ return story.get('done'); });
    },

    insprint: function(){
      return this.filter(function(story){ return story.get('insprint') > 0 });
    },

    nosprint: function() {
      return this.filter(function(story) { return story.get('insprint') === 0 });  
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

	url :'/story',

    // Todos are sorted by their original insertion order.
    comparator: function(story) {
      return story.get('order');
    }

  });