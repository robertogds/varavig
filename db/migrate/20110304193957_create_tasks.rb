class CreateTasks < ActiveRecord::Migration
  def self.up
    create_table :tasks do |t|
      t.text :content
      t.integer :position
      t.boolean :done, :default => false
      t.string   :title
      t.integer  :estimate, :default => 0
      t.integer  :insprint, :default => 0
      t.integer  :incolumn, :default => 0

      t.timestamps
    end
  end

  def self.down
    drop_table :tasks
  end
end
