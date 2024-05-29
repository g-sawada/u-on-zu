class CanvasController < ApplicationController
  def index
    gon.google_maps_api_key = ENV['GOOGLE_MAPS_API_KEY']
  end
end
