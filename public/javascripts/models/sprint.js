var Sprint = Backbone.Model.extend({

  initialize: function() {
  },

  validateAttributes: function() {
    return {
        title: this.get("title")
    }
  },

  url : function() {
	 return this.id ? '/sprint/' + this.id : '/sprint';
   },

  clear: function() {
    this.destroy();
    this.view.remove();
  },

  validate:function(attrs){
      if(!attrs.title && !this.get("title")){
          return "Sprints must have a title";
      }
  }

});