$(function(){

	if (Modernizr.input.autofocus) {
	  // autofocus works!
	} else {
	  // no autofocus support :(
	  // fall back to a scripted solution
	  $('input[autofocus]').filter(function(){
		$(this).focus();
	  })
	}
})