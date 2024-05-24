class Api::TemplatesController < Api::BaseController
  # GET /api/templates
  # テスト表示用
  def index
    templates = current_user.templates
    render json: { templates: templates }
  end

  # GET /api/templates/:id
  def show
    graph = Template.find(params[:id])
    render json: { template: template, graph_setting: template.graph_setting }
  end

  # POST /api/templates
  def create
    ActiveRecord::Base.transaction do
      template = current_user.templates.new(template_params.except(:graph_setting))
      graph_setting = template.build_graph_setting(settings: template_params[:graph_setting])

      if template.save && graph_setting.save
        render json: { template: template, graph_setting: graph_setting }, status: :ok
      else
        raise ActiveRecord::Rollback
      end
    end
  rescue ActiveRecord::Rollback
    render json: { error: '保存に失敗しました' }, status: :unprocessable_entity
  end

  private
  def template_params
    params.require(:template).permit(:title, graph_setting: {})
  end
end
