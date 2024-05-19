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
    graph = current_user.graphs.new(graph_params)
    if graph.save
      render json: { graph: graph }, status: :ok
    else
      render json: { error: '保存に失敗しました' }, status: :unprocessable_entity
    end
  end


  private
  def graph_params
    params.require(:graph).permit(:title, :note)
  end
end
