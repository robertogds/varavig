$(function(){
	setColumnHeight();


	// substring text
	$('[class*="substring_"]').each(function(){
		var t = $(this);
		var c = t.attr('class').split(" ");
		for (var i in c) {
			if (c[i].indexOf("substring_") != -1) {
				var chars = parseInt(c[i].split("_")[1]);
				t.attr('title',t.html())
					.html(t.html().substring(0, chars) + "...");
			}
		}
	});
	
	// toogle panels
	$('.expand_task').click(function(e){
		e.preventDefault();
		var t = $(this);
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
		setScroll(par.parents('.tasks_wrapper'));
	});
	
	$('.expand_all').click(function(e){
		e.preventDefault();
		var task = $(this).parents('.column').find('.task');
		task.addClass('expanded')
			.find('.detail').show();
		
		setScroll(task.parents('.tasks_wrapper'));
	});
	
	$('.collapse_all').click(function(e){
		e.preventDefault();
		var task = $(this).parents('.column').find('.task');
		task.removeClass('expanded')
			.find('.detail').hide();
		
		setScroll(task.parents('.tasks_wrapper'));
	});
	$('#open_dashboard_link').click(function(e){
		$(this).hide();
		$("#columns").removeClass('dashboard_collapsed');
	});
	$('.hide_dashboard').click(function(e){
		e.preventDefault();
		t = $(this);
		var par = t.parents('#columns');
		
		par.addClass('dashboard_collapsed');
		$('#open_dashboard_link').show();
	});
	
	$('#open_done_link').click(function(e){
		$(this).hide();
		$("#columns").removeClass('done_collapsed');
	});
	$('.hide_done').click(function(e){
		e.preventDefault();
		t = $(this);
		var par = t.parents('#columns');
		
		par.addClass('done_collapsed');
		$('#open_done_link').show();

	});
	
	$('input').placeholder();
	
	setColumnHeight();
	$(window).resize(function() {
		setColumnHeight();
	});
	
	$(".tasks").sortable({
		connectWith: ".tasks",
		handle: '.drag',
		placeholder: "sort_placeholder",
		distance: 10,
		opacity: 0.6,
		forceHelperSize: true,
		forcePlaceholderSize: true,
	});

	// color picker
	$('.pick_color').click(function(){
		var link = $(this);
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
	});

	$('.picker_panel a').live('click',function(){
		var link = $(this);
			
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
	});

	// FILTER
	$('.filter').click(function(){
		var par = $(this).parents('.actions');
		var panel = par.find('.filter_panel');
		
		if (panel.is(':visible')) {
			panel.fadeOut();
		} else {
			panel.fadeIn();
		}
		
	});
	$('.filter_panel a').click(function(){
		$(this).parents('.filter_panel').fadeOut();
	});
	
	// EDIT 
	$('.data').click(function(){
		var t = $(this);
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
			
			setInputData(par);
		}
	});

	$('.editing_actions a').click(function(){
		var action = $(this);
		var task = action.parents('.task');
		var edit_areas = task.find('.edit');
		
		if (action.hasClass('save_task')) {
		
			edit_areas.each(function(){
				var edit_area = $(this);
			
				updateDataValues(edit_area);
				
				edit_area.removeClass('edit');
			});
		} else if (action.hasClass('cancel_save_task')) {
			setInputData(edit_areas);
			edit_areas.removeClass('edit');
		}
		
		task.removeClass('editing_task');
	});
	
	$('.block_task').click(function(){
		alert("falta por implementar el bloqueo de tarea");
	});
	$('.delete_task').click(function(){
		alert("falta por implementar el delete de tarea");
	$('.add_tag').click(function(){
	});
		alert("falta por implementar el delete de tarea");
	});
	
});

function setColumnHeight(){
	var winH = $(window).height();
	var headerH = $('#header').outerHeight()
	var colH = winH - headerH - 50;
	$('.column .tasks_wrapper, .column .collapsed').height(colH);
	
	$('.column .collapsed h2').css('top',colH/2);
	
	
	setScroll($('.tasks_wrapper'));
}

function setInputData(group){
	var data = group.find('.data');

	if (group.find('.field, .field_group').size()) {
		if (group.hasClass('percentage')) {

		} else {
			group.find('input, textarea').val(data.html());
		}
	} else {
		if (data.hasClass('input')) {
			// create input (for title tag)
			var field = "<input type='text' class='field' value='"+data.html()+"'/>";
			$(field).insertAfter(data);
		} else if (data.hasClass('textarea')) {
			// create texarea for (description and blocked)
			var field = "<textarea class='field'>"+data.html()+"</textarea>";
			$(field).insertAfter(data);
		} else if (data.hasClass('select')) {
			// create combo (for person, completed, estimated)
			if (data.parent().hasClass('person')) {
			
				var field = "<select class='field'>";
					field += "<option value='roberto'>Roberto Gil</option>";
					field += "<option value='pablo'>Pablo Pazos</option>";
					field += "<option value='jaime'>Jaime Fernandez</option>";
					field += "</select>";

				$(field).insertAfter(data);
			}
		}
	}
}

function updateDataValues(edit_area) {
	
	if (edit_area.hasClass('percentage')) {
		var completed = edit_area.find('.completed_time').val();
		var estimated = edit_area.find('.estimated_time').val();
		
		if (completed > 0 && estimated > 0) {
			if ( estimated < completed) { alert("percentage field error. Com:" + completed + " #est: " + estimated); }
			var percentaje = completed * 100 / estimated;
		} else {
			alert("both fields are required");
		}
		
		edit_area.find('.complete').css('width',percentaje+"%").html(percentaje+"%");
		
	} else {
		var value = edit_area.find('.field').val();
		
		edit_area.find('.data').html(value);
	}
	
	alert("implementar envio ajax de la informacion");
}

function setScroll(item){
/*	item.jScrollPane({
		showArrows: true
	});
	*/
}

