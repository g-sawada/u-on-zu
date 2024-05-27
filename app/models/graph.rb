class Graph < ApplicationRecord
  belongs_to :user
  belongs_to :city
  has_one :graph_setting, as: :metadata, dependent: :destroy

  validates :user_id, presence: true
  validates :city_id, presence: true
  validates :title, presence: true, length: { maximum: 255 }
  validates :note, length: { maximum: 65_535 }
end
