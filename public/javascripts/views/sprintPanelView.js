// This is the view for the backlog column
Varavig.Views.SprintPanelView = Varavig.Views.AbstractView.extend({
    _finished_view: null,
	_started_view: null,
	_not_started_view: null,
	_backlog_view: null,
	_columns: null,
	
	events: {
		"click .expand_all": "expand_all",
		"click .collapse_all": "collapse_all",
		"click #open_backlog_link": "open_backlog_link",
		"click .hide_backlog": "hide_backlog",
		"click #open_finished_link": "open_finished_link",
		"click .hide_finished": "hide_finished",
		"click .filter": "filter",
		"click .filter_panel a": "filter_panel"
	},
	
    initialize: function() {
		//instantiate the panels views
        this._finished_view = new Varavig.Views.FinishedView({ collection: this.collection });
        this._started_view = new Varavig.Views.StartedView({ collection: this.collection});
        this._not_started_view = new Varavig.Views.NotStartedView({ collection: this.collection });
        this._backlog_view = new Varavig.Views.BacklogView({ collection: this.collection});
		this._columns = new Varavig.Collections.Columns(Varavig.COLUMNS);
		//IF task collection changes we must render again
		this.collection.bind('all', _.bind(this.render, this));
    },

    render: function() {
        $(this.el).html(_.template($('#sprint_panel').html())({
        	sprint: this.model,
			columns: this._columns
        }));
        $('#main_container').html(this.el);
		//Render panel views 
		this.render_panels();
		/* jquery by jaime, move to better place!*/
		this.setColumnHeight();
		var self = this;
		$(window).resize(function() {
			self.setColumnHeight();
		});
		/* end */
        this.delegateEvents();
        return this;
    },

	render_panels: function(){
		this._finished_view.render();
		this._started_view.render();
		this._not_started_view.render();
		this._backlog_view.render();
		return false;
	},
	
	// FILTER
	filter: function(event){
		var par = $(event.currentTarget).parents('.actions');
		var panel = par.find('.filter_panel');
		
		if (panel.is(':visible')) {
			panel.fadeOut();
		} else {
			panel.fadeIn();
		}
	},
	
	filter_panel: function(event){
		$(event.currentTarget).parents('.filter_panel').fadeOut();
	},
	
	open_finished_link: function(event){
		$(event.currentTarget).hide();
		$("#columns").removeClass('finished_collapsed');
		return false;
	},
	
	hide_finished: function(event){
		event.preventDefault();
		t = $(event.currentTarget);
		var par = t.parents('#columns');
		
		par.addClass('finished_collapsed');
		$('#open_finished_link').show();
		return false;
	},
	
	setColumnHeight:function(){
		var winH = $(window).height();
		var headerH = $('#header').outerHeight()
		var colH = winH - headerH - 50;
		$('.column .tasks_wrapper, .column .collapsed').height(colH);
		$('.column .collapsed h2').css('top',colH/2);
		this.setScroll($('.tasks_wrapper'));
		return false;
	},
	
	expand_all: function(event){
		event.preventDefault();
		var task = $(event.currentTarget)
			.parents('.column').find('.task');
		task.addClass('expanded')
			.find('.detail').show();
		this.setScroll(task.parents('.tasks_wrapper'));
		return false;
	},
	
	collapse_all: function(event){
		event.preventDefault();
		var task = $(event.currentTarget)
			.parents('.column').find('.task');
		task.removeClass('expanded')
			.find('.detail').hide();
		this.setScroll(task.parents('.tasks_wrapper'));
		return false;
	},
	
	open_backlog_link: function(event){
		$(event.currentTarget).hide();
		//this._columns.find_by_name('backlog').at(0).set({"class": ""});
		$("#columns").removeClass('backlog_collapsed');
		return false;
	},
	
	hide_backlog: function(event){
		event.preventDefault();
		t = $(event.currentTarget);
		var par = t.parents('#columns');
		par.addClass('backlog_collapsed');
		//this._columns.find_by_name('backlog').first().set({"class": 'backlog_collapsed'});
		$('#open_backlog_link').show();
		return false;
	}

});