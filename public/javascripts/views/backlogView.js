// This is the view for the backlog column
Sprint.Views.BacklogView = Backbone.View.extend({
	events: {
    "sortstop .stories":  "sortstop",
    "sortreceive": "receive"
  },

    initialize: function() {
        this.render();
    },
    
    render: function() {
        $(this.el).html(JST.stories_collection({ collection: Sprint.Stories}));
	    $('#items').html(this.el);

        $( ".stories" ).sortable({
			connectWith: ".nostart"
		});
        $( ".nostart" ).sortable({
			connectWith: ".stories"
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
        $( ".stories" ).disableSelection();
        return this;


    },

    receive: function(event,ui) {
       	var story = new Story();
	    story = Sprint.Stories.get(ui.item.context);
	    story.set({"insprint": 0});
	    story.save();
    },

    noass: function() {
        alert("stop en noassig");
    },

    sortstop: function() {
	  var orden = 1;
	  var result = $('#stories').sortable('toArray');
	  var story = new Story();
	  _.each(result, function(num){ 
		story = Sprint.Stories.get(num);
		if (story.get("order") != orden) {
			story.set({"order": orden});
			story.save();
		}
		 orden++;
	   })
    }
});