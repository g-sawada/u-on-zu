class ApplicationController < ActionController::Base
  before_action :set_gon    # 全てのページで最初にgonに環境変数をセットする

  add_flash_types :success, :info, :warning, :error

  def set_gon
    gon.google_maps_api_key = ENV['GOOGLE_MAPS_API_KEY']
  end

  private
  # def check_profile
  #   redirect_to mypage_path, warning: 'ユーザー情報を登録してください' unless current_user.profile
  # end
end
