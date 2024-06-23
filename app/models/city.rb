class City < ApplicationRecord
  has_many :graphs
  has_many :download_counts

  validates :name, presence: true
  validates :data, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[name]
  end
end
