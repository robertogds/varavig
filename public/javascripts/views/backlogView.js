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
        $(this.el).html(JST.stories_collection({ collection: this.collection }));
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

    receive: function() {
        alert("entra en receive");
    },

    noass: function() {
        alert("stop en noassig");
    },

    sortstop: function() {
	  var orden = 1;
      //alert ("entra en sortstop");
	  var result = $('#stories').sortable('toArray');
	  //alert (result.length);
	  var story = new Story();
	  _.each(result, function(num){ 
		story = Sprint.Stories.get(num);
	//	alert("leyendo historia " + story.get("title"));
	    var order = story.get("order");
		if (order != orden) {
			story.set({"order": orden});
			story.save();
		}
		 orden++;
	  })
    }
});