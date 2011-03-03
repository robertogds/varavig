/**
 * Created by .
 * User: cscarioni
 * Date: 26-Feb-2011
 * Time: 17:13:41
 * To change this template use File | Settings | File Templates.
 */
describe("Task",function(){
    var task;

   beforeEach(function() {
     task = new Task;
     $.ajax=function(params){}
  });

    it("When saving a task it must fail if doesn't have a title or a Story",function(){
        var errorChecked=false;
        task.bind("error", function(model, error) {
            expect(error).toBeDefined();
            errorChecked=true;
        });
        task.save();
        expect(errorChecked).toBeTruthy();
    });


});

