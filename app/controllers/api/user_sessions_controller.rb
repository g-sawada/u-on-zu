class Api::UserSessionsController < Api::BaseController
  def check_login
    render json: { login: logged_in? }
  end
end