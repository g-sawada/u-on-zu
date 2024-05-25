class TemplatesController < ApplicationController
  before_action :require_login

  def index
    @templates = current_user.templates
  end

  def show
  end

  private

  # 追々，Concernを使って共通化する
  def not_authenticated
    redirect_to login_path, error: "ログインが必要です"
  end
end
