class StoryController < ApplicationController
  def index
     render :json => Story.all
   end

   def show
     render :json => Story.find(params[:id])
   end

   def create
     story = Story.create! params
     render :json => story
   end

   def update
     story = Story.find(params[:id])
     story.update_attributes! params
     render :json => story
   end
  
   def destroy
    story = Story.find(params[:id])
    story.destroy
    render :json => story
  end

end
