class City < ApplicationRecord
  has_many :graphs
  has_many :download_counts

  validates :name, presence: true
  validates :data, presence: true
end
