class UpdateAssociationsOnTables < ActiveRecord::Migration
  def change
    change_table :videos do |t|
      t.remove :video_bookmark_id, :video_resource_id, :tag_id

    end

    create_table :videos_tags, id: false do |t|
      t.belongs_to :video_tag, index: true
      t.belongs_to :video, index: true
    end

    rename_table :tags, :video_tags
  end
end
