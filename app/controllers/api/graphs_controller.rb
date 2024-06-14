class Api::GraphsController < Api::BaseController
  # GET /api/graphs
  # テスト表示用
  def index
    graphs = current_user.graphs.all
    render json: { current_user: current_user, graphs: graphs }
  end

  # GET /api/graphs/:id
  def show
    graph = current_user.graphs.find(params[:id])
    render json: { graph: graph, graph_setting: graph.graph_setting }
  end

  # POST /api/graphs
  def create
    graph = current_user.graphs.new(graph_params.except(:thumbnail_url, :graph_setting))
    graph.thumbnail_data_uri = graph_params[:thumbnail_url]  # gem 'carrierwave-data-uri'のメソッドで画像データを投入
    graph_setting = graph.build_graph_setting(settings: graph_params[:graph_setting])
    
    ActiveRecord::Base.transaction do
      graph.save!
      graph_setting.save!
      render json: { graph: graph, graph_setting: graph_setting }, status: :ok
    end
  rescue ActiveRecord::RecordInvalid => e
    logger.error(e.message)
    render json: { error: '保存に失敗しました。' }, status: :unprocessable_entity
  end

  private
  def graph_params
    params.require(:graph).permit(:title, :note, :city_id, :thumbnail_url, graph_setting: {})
  end
end
