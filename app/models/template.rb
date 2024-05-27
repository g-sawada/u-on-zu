class Template < ApplicationRecord
  belongs_to :user
  has_one :graph_setting, as: :metadata, dependent: :destroy

  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 255 }
end
