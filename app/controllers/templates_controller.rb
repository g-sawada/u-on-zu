class TemplatesController < ApplicationController
  before_action :require_login

  def index
    @templates = current_user.templates
  end

  def show
  end

  def destroy
    template = current_user.templates.find(params[:id])
    template.destroy!
    redirect_to templates_path, info: "マイテンプレート「#{template.title}」を削除しました", status: :see_other
  end

  private

  # 追々，Concernを使って共通化する
  def not_authenticated
    redirect_to login_path, error: "ログインが必要です"
  end
end
