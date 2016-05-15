class CreateSupportTables < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :identifier

      t.timestamps
    end

    create_table :games do |t|
      t.string :short_name
      t.string :long_name

      t.timestamps
    end

    create_table :video_bookmarks do |t|
      t.integer :time_in_seconds
      t.string :description

      t.integer :video_bookmark_type_id
      t.integer :video_id

      t.timestamps
    end

    create_table :video_bookmark_types do |t|
      t.string :identifier

      t.timestamps
    end

    create_table :instructors do |t|
      t.string :name

      t.timestamps
    end

    create_table :video_resources do |t|
      t.integer :time_in_seconds
      t.string :description
      t.boolean :is_strat
      t.string :image_file

      t.integer :video_id
      t.timestamps
    end

    add_column :videos, :tag_id, :integer
    add_column :videos, :instructor_id, :integer
    add_column :videos, :video_bookmark_id, :integer
    add_column :videos, :video_resource_id, :integer
    add_column :videos, :game_id, :integer
  end
end
