// Todo Model
// ----------

// Our basic **Todo** model has `content`, `order`, and `done` attributes.
window.Todo = Backbone.Model.extend({

  // If you don't provide a todo, one will be provided for you.
  EMPTY: "empty todo...",

  // Ensure that each todo created has `content`.
  initialize: function() {
    if (!this.get("content")) {
      this.set({"content": this.EMPTY});
    }
  },

  // Toggle the `done` state of this todo item.
  toggle: function() {
    this.save({done: !this.get("done")});
  },

	url : function() {
		// to know where to send its REST call.
		return this.id ? '/todos/' + this.id : '/todos';
	},

  // Remove this Todo from *localStorage* and delete its view.
  clear: function() {
    this.destroy();
    this.view.remove();
  }

});

// Todo Collection
// ---------------

// The collection of todos is backed by *localStorage* instead of a remote
// server.
window.TodoList = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: Todo,

  // Save all of the todo items under the `"todos"` namespace.
  //localStorage: new Store("todos"),

  // Filter down the list of all todo items that are finished.
  done: function() {
    return this.filter(function(todo){ return todo.get('done'); });
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

	url :'/todos',

  // Todos are sorted by their original insertion order.
  comparator: function(todo) {
    return todo.get('order');
  }

});