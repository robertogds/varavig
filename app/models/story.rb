class Story < ActiveRecord::Base
attr_accessible :title, :content, :order, :done, :insprint, :estimate
  
  def to_json(options = {})
    super(options.merge(:only => [ :id, :title, :content, :order, :done, :insprint, :estimate ]))
  end
end