class AddThumbnailToGraphs < ActiveRecord::Migration[7.1]
  def change
    add_column :graphs, :thumbnail, :string
  end
end
