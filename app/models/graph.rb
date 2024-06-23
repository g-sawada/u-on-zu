class Graph < ApplicationRecord
  belongs_to :user
  belongs_to :city
  has_one :graph_setting, as: :metadata, dependent: :destroy

  mount_uploader :thumbnail, GraphThumbnailUploader

  validates :user_id, presence: true
  validates :city_id, presence: true
  validates :title, presence: true, length: { maximum: 255 }
  validates :note, length: { maximum: 65_535 }

  def self.ransackable_attributes(_auth_object = nil)
    %w[title note created_at updated_at]
  end

  def self.ransackable_associations(_auth_object = nil)
    %w[city]
  end
end
