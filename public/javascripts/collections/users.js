// User Collection
Sprint.Collections.Users = Backbone.Collection.extend({
   
	// Reference to this collection's model.
    model: User,
	url :'/user'

});