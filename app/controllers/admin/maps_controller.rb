class Admin::MapsController < AdminController
  def index
    @maps = Map.all
  end
end