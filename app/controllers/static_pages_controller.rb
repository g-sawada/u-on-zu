class StaticPagesController < ApplicationController
  def top
  end

  def develop
    gon.google_maps_api_key = ENV['GOOGLE_MAPS_API_KEY']
  end

  def contact
  end
end
