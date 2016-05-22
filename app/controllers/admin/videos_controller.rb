class Admin::VideosController < AdminController
  def index
    @videos = Video.includes(:instructor).all.order(created_at: :desc)
  end
end