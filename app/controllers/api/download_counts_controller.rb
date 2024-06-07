  # POST /api/download_counts
  def create
    city = City.find(params[:city_id])
    download_count = city.download_counts.new

    if logged_in?
      download_count.user = current_user
    end

    if download_count.save
      render json: { download_count: download_count }, status: :ok
    else
      render json: { error: '保存に失敗しました。' }, status: :unprocessable_entity
    end
  end