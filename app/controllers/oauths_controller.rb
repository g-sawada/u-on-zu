class OauthsController < ApplicationController
  # 指定されたプロバイダの認証ページにリダイレクトする(login_atはsorceryのメソッド)
  def oauth
    login_at(params[:provider])
  end

  # 認証ページからのリダイレクトを受け取る
  def callback
    provider = auth_params[:provider]

    # ログインを試みる
    if @user = login_from(provider)  # login_fromはsorceryのメソッド
      redirect_to canvas_path, success: "#{provider.titleize}アカウントでログインしました"

    else # 外部認証のログインに失敗した場合 
      sorcery_fetch_user_hash(provider)   # プロバイダのユーザーデータを取得
      # 既存ユーザーを探す（@user_hashはsorcery_fetch_user_hashで宣言されたインスタンス）
      @user = User.find_by(email: @user_hash[:user_info]["email"])
      if @user  # 既存ユーザーが見つかった場合
        # プロバイダとuidを既存データに紐づける
        @user.authentications.create(provider: provider, uid: @user_hash[:uid].to_s) 
        reset_session
        auto_login(@user)
        redirect_to canvas_path, success: "#{provider.titleize}アカウントでログインできるようになりました"
      
      else # 既存ユーザーが見つからなかった場合
        ActiveRecord::Base.transaction do
          @user = create_from(provider)  # ユーザーを新規作成
          @user.create_default_templates!
        end
        reset_session
        auto_login(@user)
        redirect_to edit_profile_path, success: "#{provider.titleize}アカウントでログインしました。続いて，ユーザー情報を登録してください。"
      end
    end
  rescue StandardError
    redirect_to login_path, error: "#{provider.titleize}アカウントの認証に失敗しました。"
  end

  private

  def auth_params
    params.permit(:code, :provider)
  end

end
