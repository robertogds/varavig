
var Task = Backbone.Model.extend({

  EMPTY: "empty task...",

  initialize: function() {
    if (!this.get("content")) {
      this.set({"content": this.EMPTY});
    }
  },

  toggle: function() {
    this.save({done: !this.get("done")});
  },

	url : function() {
		return this.id ? '/task/' + this.id : '/task';
	},

  clear: function() {
    this.destroy();
    this.view.remove();
  }

});
