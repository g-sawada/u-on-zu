class Api::CitiesController < Api::BaseController
  # GET /api/cities
  # テスト表示用
  def index
    cities = City.all
    render json: { message: 'Hello, World!', cities: cities }
  end

  # GET /api/cities/:id
  def show
    city = City.find(params[:id])
    render json: { name: city.name, data: city.data }
  end
end