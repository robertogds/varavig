class CreateStories < ActiveRecord::Migration
  def self.up
    create_table :stories do |t|
      t.text :content
      t.integer :order
      t.boolean :done
      t.string   :title
      t.integer  :estimate
      t.integer  :insprint

      t.timestamps
    end
  end

  def self.down
    drop_table :stories
  end
end
