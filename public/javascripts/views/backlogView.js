// This is the view for the backlog column
Sprint.Views.BacklogView = Backbone.View.extend({
	events: {
    "sortstop .tasks":  "sortstop",
    "sortreceive": "receive"
  },

    initialize: function() {
        this.render();
    },
    
    render: function() {
        $(this.el).html(JST.tasks_collection({ collection: Sprint.Tasks}));
	    $('#items').html(this.el);

        $( ".tasks" ).sortable({
			connectWith: ".nostart"
		});
        $( ".nostart" ).sortable({
			connectWith: ".tasks"
		});

        $( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
			.find( ".portlet-header" )
				.addClass( "ui-widget-header ui-corner-all" )
				.prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
				.end()
			.find( ".portlet-content" );

		$( ".portlet-header .ui-icon" ).click(function() {
			$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
			$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
		});
        $( ".tasks" ).disableSelection();
        return this;


    },

    receive: function(event,ui) {
       	var task = new Task();
	    task = Sprint.Tasks.get(ui.item.context);
	    task.set({"insprint": 0});
	    task.save();
    },

    noass: function() {
        alert("stop en noassig");
    },

    sortstop: function() {
	  var orden = 1;
	  var result = $('#tasks').sortable('toArray');
	  var task = new Task();
	  _.each(result, function(num){ 
		task = Sprint.Tasks.get(num);
		if (task.get("order") != orden) {
			task.set({"order": orden});
			task.save();
		}
		 orden++;
	   })
    }
});