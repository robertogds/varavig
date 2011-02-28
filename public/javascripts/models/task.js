/**
 * Created by .
 * User: cscarioni
 * Date: 24-Feb-2011
 * Time: 22:40:42
 * To change this template use File | Settings | File Templates.
 */

var Task = Backbone.Model.extend({
    story: Backbone.Model,
    url : function() {
		// to know where to send its REST call.
		return this.id ? '/task/' + this.id : '/task';
	},
    /**
     * Calling validation of all attributes on save
     * @param options
     */
    save:function(attrs, options){
        options || (options = {});
        if(!this._performValidation(this.attributes, options)) return false;
        Backbone.Model.prototype.save.call(this, attrs, options);
    },
    validate:function(attrs){
        if(!attrs.story){
            return "Task must belong to a Story";
        }else if(!attrs.title){
            return "Task must have a title";
        }
    }
});
