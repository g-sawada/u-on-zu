class Api::GraphsController < Api::BaseController
  def index
    render json: { message: 'Hello, World!' }
  end
end
