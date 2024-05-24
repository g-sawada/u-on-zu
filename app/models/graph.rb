class Graph < ApplicationRecord
  belongs_to :user
  belongs_to :city
  has_one :graph_setting, as: :metadata, dependent: :destroy
end
