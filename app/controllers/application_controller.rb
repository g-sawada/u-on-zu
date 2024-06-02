class ApplicationController < ActionController::Base
  before_action :set_gon    # 全てのページで最初にgonに環境変数をセットする
  before_action :check_profile  # ログインユーザーがプロフィールを登録しているかチェックする

  add_flash_types :success, :info, :warning, :error

  def set_gon
    gon.google_maps_api_key = ENV['GOOGLE_MAPS_API_KEY']
  end

  private
  def check_profile
    if logged_in? && current_user.occupation.nil?
      redirect_to edit_profile_path, info: 'ご利用の前に，ユーザー情報の登録を完了して下さい。'
    end
  end
end
