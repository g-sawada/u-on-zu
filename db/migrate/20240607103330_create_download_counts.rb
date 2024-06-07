class CreateDownloadCounts < ActiveRecord::Migration[7.1]
  def change
    create_table :download_counts do |t|
      t.references :user, null: true, foreign_key: true
      t.references :city, null: false, foreign_key: true

      t.timestamps
    end
  end
end
