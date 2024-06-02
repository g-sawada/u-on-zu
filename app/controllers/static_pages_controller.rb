class StaticPagesController < ApplicationController
  skip_before_action :check_profile
  def top
  end

  def develop
  end

  def contact
  end
end
