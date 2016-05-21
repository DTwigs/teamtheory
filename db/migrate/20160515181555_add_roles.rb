class AddRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.string :identifier

      t.timestamps
    end

    add_column :users, :role_id, :integer, null: false, default: 3
  end
end
