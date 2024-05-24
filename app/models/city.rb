class City < ApplicationRecord
  has_many :graphs

  validates :name, presence: true
  validates :data, presence: true
end
