// This is the view for the backlog column
Varavig.Views.AbstractPanelView = Varavig.Views.AbstractView.extend({
    events: {
        "sortstop .sortable_tasks":  "sort_stop",
        "sortreceive": "sort_receive",
        "click .delete_task": "delete_task",
        "click .edit_task": "edit_task",
		"click .block_task": "block_task",
		"click .expand_task" : "expand_task",
		"click .pick_color" : "pick_color",	
		"click .picker_panel a" : "picker_panel",
		"click .data": "edit_data",
		"click .editing_actions a": "editing_actions"
    },
	
	block_task: function(event){
        var task = new Task();
        task = this.collection.get(event.currentTarget.id);
		if (task.get("blocked")){
			task.save({"blocked": false});
		}
		else{
			task.save({"blocked": true});
		}
    },

    delete_task: function(event){
        var task = new Task();
        task = this.collection.get(event.currentTarget.id);
        this.collection.remove(task);
        task.destroy();
    },

    edit_task: function(event){
    	//Sprint.Controller.edit_task(event.currentTarget.id);
        //window.location="#task/"+ event.currentTarget.id;
    },

    total_points_left: function(column){
		var total = 0;
		var tasks = this.collection.filter(function(task) {
		  return task.get("incolumn") === column;
		});
		var total = tasks.reduce(function(m, n){ return m + n.get('left'); }, 0);
		return total;
	} ,

	// EDIT 
	edit_data:function(event){
		var t = $(event.currentTarget);
		var task = t.parents('.task');
		
		// only edit one field 
		if (task.hasClass('editing_task')) {
			alert("save changes before continue editing");
			return;
		}
		
		// only edit if task is expanded
		if (task.hasClass('expanded')) {
			// change field state to edit
			var par = t.parent();
			par.addClass('edit');
			t.parents('.task').addClass('editing_task');
			this.setInputData(par);
		}
		return false;
	},

	editing_actions: function(event){
		var action = $(event.currentTarget);
		var task = action.parents('.task');
		var edit_areas = task.find('.edit');
		
		if (action.hasClass('save_task')) {
			var self = this;
			edit_areas.each(function(){
				var edit_area = $(this);
				self.updateDataValues(edit_area);
				edit_area.removeClass('edit');
			});
		} else if (action.hasClass('cancel_save_task')) {
			this.setInputData(edit_areas);
			edit_areas.removeClass('edit');
		}
		
		task.removeClass('editing_task');
		return false;
	},

	// color picker
	pick_color: function(event){
		var link = $(event.currentTarget);
		var par = link.parents('.actions');
		
		if (link.next('.picker_panel').size()) {
			// picker panel already exists
			panel = link.next('.picker_panel');
			if (panel.is(':visible')) {
				panel.fadeOut();
			} else {
				panel.fadeIn();
			}
		} else {
			// picker panel dosen't exist
			var pos = link.position();
			
			var colors = [ "color1", "color2", "color3", "color4", "color5" ];
			var picker_panel_style = "top:"+pos.top+"; left:"+pos.left;

			var picker_panel = "<div class='picker_panel subPanel'><strong>Color</strong>";
			picker_panel += "<a href='javascript:void(0)' class='close'>close</a>";
			for ( var i=0; i < colors.length; ++i ){
			  picker_panel += "<a href='javascript:void(0)' class='" + colors[i] + "'></a>";
			}
			picker_panel += "</div>";
			$(picker_panel).insertAfter(this);
			
			par.find('.picker_panel').css({
										"bottom": link.height(),
										"left": 0})
		}
		return false;
	},

	picker_panel: function(){
		var link = $(event.currentTarget);
			
		if (link.hasClass('close')) {
			link.parents('.picker_panel').fadeOut();
		} else {
			var color = link.attr('class');
			var task = link.parents('li.task');
			link.parents('.picker_panel').fadeOut();
			
			// remove class colorX and add new color class
			var classes  = task.attr('class').split(/\s+/);
			var pattern = /^color/;

			for(var i = 0; i < classes.length; i++){
			  var className = classes[i];
			  if(className.match(pattern)){
				task.removeClass(className);
			  }
			}
			task.addClass(color);
		}
	},
	
	// toogle task panels
	expand_task: function(event){
		event.preventDefault();
		var t = $(event.currentTarget);
		var par = t.parents('.task');
		var tg_p = par.find('.detail');
		var txt = t.attr('rel').split("|");
		
		if (tg_p.is(':visible')){
			tg_p.hide();
			par.removeClass('expanded');
			t.html('expand');
			t.html(t.html().replace(txt[1],txt[0]));
		} else {
			tg_p.show();
			par.addClass('expanded');
			t.html('collapse');
			t.html(t.html().replace(txt[0],txt[1]));
		}
		this.setScroll(par.parents('.tasks_wrapper'));
	},
	
	sortable_tasks: function(){
		this.$(".tasks").sortable({
			connectWith: ".tasks",
			handle: '.drag',
			placeholder: "sort_placeholder",
			distance: 10,
			opacity: 0.6,
			forceHelperSize: true,
			forcePlaceholderSize: true,
		});
	},
	
	updateDataValues: function (edit_area) {
		var id = edit_area.parents(".task").attr("id");
		if (edit_area.hasClass('percentage')) {
			var left = parseInt(edit_area.find('.left_time').val());
			var estimated = parseInt(edit_area.find('.estimated_time').val());
			var percentaje = this.calculate_percentaje(estimated, left);
			edit_area.find('.complete').css('width',percentaje+"%").html(percentaje+"%");
			this.submit_edit({"estimate": estimated, "left": left},"percentage", id);

		} else {
			var value = edit_area.find('.field').val();
			var name = edit_area.find('.field').attr("name");
			edit_area.find('.data').html(value);
			this.submit_edit(value, name, id);
		}

		return false;
	},
    
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
	},

    submit_edit : function (value, name, id){ 
    	var task = new Task();
        task = this.collection.get(id);
        switch (name) {
	        case 'content':
	        	task.save({"content" : value });
	           break;
	        case 'title':
	        	task.save({"title" : value });
	           break;
			case 'user':
	        	task.save({"user" : value });
	           break;
	        case 'percentage':
	        	task.save({"estimate" : value.estimate });
				task.save({"left" : value.left });
	           break;
        } 
		return false;
	}
    
});