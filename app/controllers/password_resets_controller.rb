class PasswordResetsController < ApplicationController
  # パスワード再設定申請画面の表示
  # GET /password_resets/new
  def new
  end

  # パスワード再設定用メール送信
  # POST /password_resets
  def create
    @user = User.find_by(email: params[:email])
    @user&.deliver_reset_password_instructions!
    # 送信の失敗を通知すること自体にセキュリティリスクがあるため、失敗時にも強制的に処理を先へ進める

    redirect_to login_path, info: "パスワード再設定用のメールを送信しました"
  end

  # パスワード再設定画面の表示
  # GET /password_resets/:id/edit         // :id はトークン
  def edit
    @token = params[:id]
    @user = User.load_from_reset_password_token(@token)

    return not_authenticated if @user.blank?
  end

  # パスワード再設定処理
  # PATCH /password_resets/:id
  def update
    @token = params[:id]
    @user = User.load_from_reset_password_token(@token)

    return not_authenticated if @user.blank?

    @user.password_confirmation = params[:user][:password_confirmation]
    if @user.change_password(params[:user][:password])
      redirect_to login_path, success: "パスワードを変更しました"
    else
      render :edit, status: :unprocessable_entity
    end
  end
end
