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

    ActiveRecord::Base.transaction do
      @user.save!
      @user.create_default_templates!
    end

    auto_login(@user)
    redirect_to canvas_path, success: 'ユーザー登録が完了しました'

  rescue ActiveRecord::RecordInvalid => e  
    render :new, status: :unprocessable_entity
  end

  # ユーザー削除処理
  def destroy
    current_user.destroy!
    redirect_to root_path, status: :see_other ,success: 'ユーザーを削除しました'
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :occupation)
  end

end
