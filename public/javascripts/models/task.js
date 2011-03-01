var Task = Backbone.Model.extend({

  EMPTY: "empty task...",
  story: Backbone.Model,
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

   /**
     * Calling validation of all attributes on save
     * @param options

    save:function(attrs, options){
        options || (options = {});
        if(!this._performValidation(this.attributes, options)) return false;
        Backbone.Model.prototype.save.call(this, attrs, options);
    },
    validate:function(attrs){
        if(!attrs.story){
            return "Task must belong to a Story";
        }else if(!attrs.title){
            return "Task must have a title";
        }
    }*/
});
