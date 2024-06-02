class ProfilesController < ApplicationController
  before_action :require_login
  skip_before_action :check_profile, only: [:edit, :update]

  def show
    @user = current_user
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user

    if @user.update(user_params)
      redirect_to profile_path, success: "プロフィールを更新しました"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :occupation)
  end

  # 追々，Concernを使って共通化する
  def not_authenticated
    redirect_to login_path, error: "ログインが必要です"
  end
end
