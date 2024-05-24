class AddCityToGraphs < ActiveRecord::Migration[7.1]
  def up
    add_reference :graphs, :city, foreign_key: true   #一度null: falseなしで追加

    # 既存のグラフデフォルトのid1を設定
    Graph.update_all(city_id: 1)

    change_column_null :graphs, :city_id, false  #null: falseを追加
  end

  def down
    remove_reference :graphs, :city, foreign_key: true
  end
end