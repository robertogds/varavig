class TaskController < ApplicationController
  def index
     render :json => Task.all
   end

   def show
     render :json => Task.find(params[:id])
   end

   def create
     task = Task.create! params
     render :json => task
   end

   def update
     task = Task.find(params[:id])
     task.update_attributes! params
     render :json => task
   end
  
   def destroy
    task = Task.find(params[:id])
    task.destroy
    render :json => task
  end

end
