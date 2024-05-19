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
end
