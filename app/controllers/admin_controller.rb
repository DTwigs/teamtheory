class AdminController < ApplicationController
  layout 'admin/adminlte'

  before_action :authorize_admin

  private
  def authorize_admin
    unless admin?
      redirect_to root_path
    end
  end

  def admin?
    return false if !current_user.present?
    current_user.role.admin?
  end

end