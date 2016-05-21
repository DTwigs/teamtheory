class AddNameAndIsActiveToUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.string :name
      t.boolean :is_active, null: false, default: true
    end
  end
end
