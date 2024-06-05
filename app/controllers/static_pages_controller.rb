class StaticPagesController < ApplicationController
  skip_before_action :check_profile
  def top
  end

  def develop
  end

  def contact
  end

  def terms_of_service
  end

  def privacy_policy
  end
end
