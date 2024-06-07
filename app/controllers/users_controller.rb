class UsersController < ApplicationController
  # ユーザーの新規作成・削除を担う。マイページの表示と更新はprofileコントローラーで行う

  # 新規作成画面の表示
  # GET /users/new
  def new
    @user = User.new
  end

  # 新規登録処理
  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      auto_login(@user)

      # デフォルトのテンプレートを作成
      template_file_path = Rails.root.join('db', 'default_template.json')


      redirect_to canvas_path, success: 'ユーザー登録が完了しました'
    else
      render :new, status: :unprocessable_entity
    end
  end

  # ユーザー削除処理
  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :occupation)
  end

end
