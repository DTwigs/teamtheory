class VideoBookmark < ActiveRecord::Base
  has_many :video_bookmark_types
  belongs_to :video
end