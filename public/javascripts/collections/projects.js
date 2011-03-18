// Projects Collection
  // ---------------
  Varavig.Collections.Projects = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Project,

	//returns not finisehd projects 
    active: function(){
      return this.without.apply(this, this.done());
    },

	url :'/project',

  });