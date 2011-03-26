// Columns Collection
  // ---------------
  Varavig.Collections.Columns = Backbone.Collection.extend({
	
	find_by_name: function(name){
      return this.filter(function(column){ return column.get('name') === name });
    }

  });