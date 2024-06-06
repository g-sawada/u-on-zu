require 'json'

# JSONデータを読み込み
file_path = File.join(Rails.root, 'db', 'fixtures', 'output_test.json')
json_data = File.read(file_path)
cities = JSON.parse(json_data)

cities.each do |city|
  City.seed(:id) do |s|
    s.id = city['id']
    s.name = city['name']
    # s.country_id = city['country_id']
    s.data = city['data']
  end
end
