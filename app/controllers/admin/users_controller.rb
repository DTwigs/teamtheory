class Admin::UsersController < AdminController
  def index
    @users = User.all.order(created_at: :desc)
  end

  def show
    user_id = params.fetch('id')
    if user_id.present?
      @user = User.find(user_id)
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(is_active: params[:user][:is_active])
      flash[:info] = "Successfully updated user."
      render 'show'
    else
      flash[:error] = "Failed to update this user. Please try again."
      render 'show'
    end
  end
end