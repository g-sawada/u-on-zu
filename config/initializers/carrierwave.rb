require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  # 本番環境のみS3にアップロード
  if Rails.env.production?
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'u-on-zu-bucket2' # バケット名
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: 'ap-southeast-2',   # リージョンを記述
      path_style: true
    }
  else # 開発・テスト環境はローカルのpublicディレクトリ
    config.storage :file
  end
end