class Task < ActiveRecord::Base
attr_accessible :title, :content, :position, :done, :insprint, :estimate, :incolumn
  
  def to_json(options = {})
    super(options.merge(:only => [ :id, :title, :content, :position, :done, :insprint, :estimate, :incolumn ]))
  end
end