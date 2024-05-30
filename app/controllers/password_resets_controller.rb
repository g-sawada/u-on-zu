class PasswordResetsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    @user&.deliver_reset_password_instructions!
    # 送信の失敗を通知すること自体にセキュリティリスクがあるため、失敗時にも強制的に処理を先へ進める

    redirect_to login_path, info: "パスワード再設定用のメールを送信しました"
  end

  def edit
  end
end
