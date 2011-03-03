var Task = Backbone.Model.extend({

  EMPTY: "You need define this task",
  //story: Backbone.Model, (I think you don't need to declare this, don't you?)
  initialize: function() {
    if (!this.get("content")) {
      //this.set({"content": this.EMPTY});
    }
  },

  validateAttributes: function() {
    return {
        title: this.get("title")
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
  },

    validate:function(attrs){
        if(!attrs.title && !this.get("title")){
            return "Task must have a title";
        }
    }
});
