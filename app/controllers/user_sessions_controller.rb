class UserSessionsController < ApplicationController
  # ログイン画面の表示
  # GET /login
  def new
  end

  # ログイン処理
  # POST /login
  def create
    @user = login(params[:email], params[:password])

    if @user
      redirect_back_or_to root_path, success: 'ログインしました'
    else
      flash.now[:error] = 'ログインに失敗しました'
      render :new, status: :unprocessable_entity
    end
  end

  # ログアウト処理
  # DELETE /logout
  def destroy
    logout
    redirect_to root_path, status: :see_other, info: 'ログアウトしました'
  end
end
