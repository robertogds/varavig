// User Stories Collection
  // ---------------
  Varavig.Collections.Tasks = Backbone.Collection.extend({
		
	// Reference to this collection's model.
    model: Task,

	url :'/task',

    finished: function() {
  	  return this.tasks_in_column(Varavig.FINISHED_COLUMN);
    },
      
    started: function() {
  	  return this.tasks_in_column(Varavig.STARTED_COLUMN);
    },
    
    not_started: function() {
    	  return this.tasks_in_column(Varavig.NOTSTARTED_COLUMN);
    },
    
    backlog: function() {
    	  return this.tasks_in_column(Varavig.BACKLOG_COLUMN);
    },
    
    // Filter down the list of all todo items that are in the given column.
    tasks_in_column: function(column) {
      var tasks_array = this.filter(function(task){ return task.get('incolumn') === column; });
	  return new Varavig.Collections.Tasks(tasks_array);
    },

    insprint: function(){
      return this.filter(function(task){ return task.get('insprint') > 0 });
    },

    nosprint: function() {
      return this.filter(function(task) { return task.get('insprint') === 0 });  
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply(this, this.done());
    },

    //This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('position') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(task) {
      return task.get('position');
    },

	parse_percentaje: function() {
		//we calculate the done task percentaje before render de tasks collection
		var self = this;
        this.forEach(function(task) {
         	task.set({"percentaje": self.calculate_percentaje(task.get("estimate"), task.get("left"))}) ;
        })
    	return this;
    },

	//calculate percentaje of task already done
	calculate_percentaje: function(estimated, left){
		var percentaje = 0;
		if (left > 0 && estimated > 0 && estimated != left) {
			if ( estimated < left) { alert("percentage field error. Left:" + left + " #est: " + estimated); }
			percentaje = (estimated - left) * 100 / estimated ;
		}
		if (left == 0){
			percentaje = 100;
		}
		return percentaje;
	}
	

  });