var Story = Backbone.Model.extend({
    initialize: function() {
       this.set({tasks:new Varavig.Collections.Tasks},{silent:true});
    },
	url : function() {
		// to know where to send its REST call.
		return this.id ? '/story/' + this.id : '/story';
	},

  // Remove this Todo from *localStorage* and delete its view.
  clear: function() {
    this.destroy();
    this.view.remove();
  },

    addTask: function(task){
        this.get("tasks").add(task);
        task.set({story:this});
    },

    /**
     * Calling validation of all attributes on save
     * @param options
     */
    save:function(attrs, options){
        options || (options = {});
        if(!this._performValidation(this.attributes, options)) return false;
        Backbone.Model.prototype.save.call(this, attrs, options);
    },

    validate:function(attrs){
        if(!attrs.title){
            return "Title is mandatory for stories";
        }
    }

});


