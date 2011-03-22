// This is the abstract view for varavig. Contains general function
Varavig.Views.AbstractView = Backbone.View.extend({
	
	setInputData: function(group){
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
		return false;
	},


	
	
	truncate_long_texts: function(){
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
	},
	
	
    setScroll: function(item){
	/*	item.jScrollPane({
			showArrows: true
		});
		*/
	}
	
});