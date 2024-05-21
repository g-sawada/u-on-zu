class Api::UserSessionsController < Api::BaseController
  def check_login
    render json: { logged_in: logged_in? }
  end
end