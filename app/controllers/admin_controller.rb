class AdminController < ApplicationController
  before_action :authorize_admin

  def index
    
  end

  private 
  def authorize_admin
    unless admin?
      redirect_to root_path
      flash[:notice] = "You are not an admin"
    end
  end

  def admin?
    current_user.role.admin?
  end

end