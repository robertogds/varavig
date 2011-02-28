class Task < ActiveRecord::Base
attr_accessible :title, :content, :position, :done, :insprint, :estimate
  
  def to_json(options = {})
    super(options.merge(:only => [ :id, :title, :content, :position, :done, :insprint, :estimate ]))
  end
end