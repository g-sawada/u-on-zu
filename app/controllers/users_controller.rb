class UsersController < ApplicationController
  # ユーザーの新規作成・削除を担う。マイページの表示と更新はprofileコントローラーで行う

  # 新規作成画面の表示
  def new
    @user = User.new
  end

  # 新規登録処理
  def create
  end

  # ユーザー削除処理
  def destroy
  end
end
