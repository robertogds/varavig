var Project = Backbone.Model.extend({
 
  initialize: function() {
  },

  validateAttributes: function() {
    return {
        title: this.get("title")
    }
  },


  url : function() {
	 return this.id ? '/project/' + this.id : '/project';
   },

  clear: function() {
    this.destroy();
    this.view.remove();
  },

  validate:function(attrs){
      if(!attrs.title && !this.get("title")){
          return "Project must have a title";
      }
  }
});
