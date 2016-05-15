class CoursesController < ApplicationController
  def index
    @videos = game.videos;
  end

  def show
    @video = Video.find(params[:id])
    @bookmarks = @video.video_bookmarks.to_json
  end
end