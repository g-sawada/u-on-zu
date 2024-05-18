class CreateGraphSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :graph_settings do |t|
      t.references :metadata, null: false, polymorphic: true
      t.json :settings, null: false

      t.timestamps
    end
  end
end
