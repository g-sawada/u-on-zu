class Template < ApplicationRecord
  belongs_to :user
  has_one :graph_setting, as: :metadata, dependent: :destroy
end
