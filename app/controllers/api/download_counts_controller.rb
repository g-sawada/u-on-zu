class Api::DownloadCountsController < Api::BaseController
  # POST /api/download_counts
  def create
    # binding.pry
    city = City.find(download_image_params[:city_id])
    download_count = city.download_counts.new

    # ログイン中なら，ユーザー情報も追加で保存（user_idはNULLを認めている）
    if logged_in?
      download_count.user = current_user
    end

    if download_count.save
      render json: { download_count: download_count }, status: :ok
    else
      render json: { error: '保存に失敗しました。' }, status: :unprocessable_entity
    end
  end

  private
  def download_image_params
    params.require(:download_image).permit(:city_id)
  end
end