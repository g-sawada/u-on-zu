class ApplicationController < ActionController::Base
  before_action :set_gon    # 全てのページで最初にgonに環境変数をセットする

  add_flash_types :success, :info, :warning, :error

  def set_gon
    gon.google_maps_api_key = ENV['GOOGLE_MAPS_API_KEY']
  end
end
