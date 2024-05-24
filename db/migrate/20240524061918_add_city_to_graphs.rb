class AddCityToGraphs < ActiveRecord::Migration[7.1]
  def up
    add_reference :graphs, :city, foreign_key: true   #一度null: falseなしで追加

    # 既存のGraphレコードにCityを紐付けるため、Cityの最初のレコードを取得
    default_city = City.first
    Graph.update_all(city_id: default_city.id)

    change_column_null :graphs, :city_id, false  #null: falseを追加
  end

  def down
    remove_reference :graphs, :city, foreign_key: true
  end
end