class Api::GraphsController < Api::BaseController
  # GET /api/graphs
  # テスト表示用
  def index
    graphs = Graph.all
    render json: { message: 'Hello, World!', graphs: graphs }
  end

  # GET /api/graphs/:id
  def show
    graph = Graph.find(params[:id])
    render json: { graph: graph, graph_setting: graph.graph_setting }
  end

  # POST /api/graphs
  def create
    ActiveRecord::Base.transaction do
      graph = current_user.graphs.new(graph_params.except(:graph_setting))
      graph_setting = graph.build_graph_setting(settings: graph_params[:graph_setting])

      if graph.save && graph_setting.save
        render json: { graph: graph, graph_setting: graph_setting }, status: :ok
      else
        raise ActiveRecord::Rollback
      end
    end
  rescue ActiveRecord::Rollback
    render json: { error: '保存に失敗しました' }, status: :unprocessable_entity
  end

  private
  def graph_params
    params.require(:graph).permit(:title, :note, graph_setting: {})
  end
end
