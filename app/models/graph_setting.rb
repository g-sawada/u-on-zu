class GraphSetting < ApplicationRecord
  belongs_to :metadata, polymorphic: true

  validates :metadata_id, presence: true
  validates :metadata_type, presence: true
  validates :settings, presence: true
end
