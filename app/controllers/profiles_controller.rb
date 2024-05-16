class ProfilesController < ApplicationController
  before_action :require_login

  def show
    @user = current_user
  end

  private
  # 追々，Concernを使って共通化する
  def not_authenticated
    redirect_to login_path, error: "ログインが必要です"
  end
end
