class Video < ActiveRecord::Base
  has_and_belongs_to_many :video_tags
  belongs_to :instructor
  belongs_to :game
  belongs_to :map
  has_many :video_bookmarks
  has_many :video_resources

end