class GraphsController < ApplicationController
  before_action :require_login

  def index
    @graphs = current_user.graphs
  end

  def show
  end

  def destroy
    graph = current_user.graphs.find(params[:id])
    graph.destroy!
    redirect_to graphs_path, info: "マイグラフ「#{graph.title}」を削除しました", status: :see_other
  end

  private

  # 追々，Concernを使って共通化する
  def not_authenticated
    redirect_to login_path, error: "ログインが必要です"
  end
end
