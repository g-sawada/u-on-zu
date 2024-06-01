class OauthsController < ApplicationController
  # 指定されたプロバイダの認証ページにリダイレクトする(login_atはsorceryのメソッド)
  def oauth
    login_at(params[:provider])
  end

  # 認証ページからのリダイレクトを受け取る
  def callback
    provider = auth_params[:provider]

    if @user = login_from(provider)  # login_fromはsorceryのメソッド
      redirect_to canvas_path, success: "#{provider.titleize}アカウントでログインしました"

    else # ユーザーが存在しない場合は新規登録に進む
      begin
        auth = sorcery_fetch_user_hash(provider)
        redirect_to root_path
      rescue
        redirect_to root_path, alert: "#{provider.titleize}アカウントでのログインに失敗しました"
      end
  end

  private

  def auth_params
    params.permit(:code, :provider)
  end

end
