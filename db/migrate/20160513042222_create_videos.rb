class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :youtube_id
      t.string :description
      t.string :title
      t.string :duration

      t.timestamps
    end
  end
end
