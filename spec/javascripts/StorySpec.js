/**
 * Created by .
 * User: cscarioni
 * Date: 26-Feb-2011
 * Time: 17:13:41
 * To change this template use File | Settings | File Templates.
 */
describe("Story",function(){
    var story;

   beforeEach(function() {
    story = new Story();
  });

    it("Should have an operation to add a new task",function(){
        var task = new Task;
        story.tasks.add(task);
        expect(story.tasks.length).toEqual(1);
    });
});

