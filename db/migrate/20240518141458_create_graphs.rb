class CreateGraphs < ActiveRecord::Migration[7.1]
  def change
    create_table :graphs do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :note

      t.timestamps
    end
  end
end
