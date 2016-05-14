class Video < ActiveRecord::Base
  has_many :tags
  belongs_to :instructor
  belongs_to :game
  has_many :video_bookmarks
  has_many :video_resources

end