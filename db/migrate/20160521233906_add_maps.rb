class AddMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.string :name

      t.timestamps
    end

    add_column :videos, :map_id, :integer
  end
end
