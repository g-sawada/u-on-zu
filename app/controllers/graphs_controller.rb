class GraphsController < ApplicationController
  before_action :require_login

  def index
    @graphs = current_user.graphs
  end

  def show
    @graph = current_user.graphs.find(params[:id])
  end

  def edit
    @graph = current_user.graphs.find(params[:id])
  end

  def update
    @graph = current_user.graphs.find(params[:id])
    if @graph.update(graph_params)
      redirect_to graph_path(@graph), success: "マイグラフを更新しました"
    else
      flash.now[:error] = "マイグラフの更新に失敗しました"
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    graph = current_user.graphs.find(params[:id])
    graph.destroy!
    redirect_to graphs_path, info: "マイグラフ「#{graph.title}」を削除しました", status: :see_other
  end

  private
  def graph_params
    params.require(:graph).permit(:title, :note)
  end 

  # 追々，Concernを使って共通化する
  def not_authenticated
    redirect_to login_path, error: "ログインが必要です"
  end
end
