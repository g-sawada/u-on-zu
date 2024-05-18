class GraphSetting < ApplicationRecord
  belongs_to :metadata, polymorphic: true
end
