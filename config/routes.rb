Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  # 単体のページ
  root "static_pages#top"
  get "develop", to: "static_pages#develop"
  get "contact", to: "static_pages#contact"

  # ユーザー関連
  resources :users, only: %i[new create destroy]
  
  get "login", to: "user_sessions#new"
  post "login", to: "user_sessions#create"
  delete "logout", to: "user_sessions#destroy"

  post "oauth/callback", to: "oauths#callback" # サービスによってGETとPOSTが異なる場合があるので両方作成
  get "oauth/callback", to: "oauths#callback"
  get "oauth/request/:provider", to: "oauths#oauth", as: :auth_at_provider

  get "mypage", to: "profiles#show"
  get "mypage/edit", to: "profiles#edit"
  patch "mypage", to: "profiles#update"
  
  # これで代用できるっぽい　→　mypage_path が profiles_path に変わるので注意
  # resource :profile, only: [:show, :edit, :update], path: 'mypage'
  
  resources :password_resets, only: %i[new create edit update]


  # グラフ作成メイン画面
  get "canvas", to: "canvas#index"
  
  # マイグラフ・マイテンプレート・都市
  resources :graphs, only: %i[index show destroy]
  resources :templates, only: %i[index destroy]
  resources :cities, only: %i[index]

  # API
  namespace :api do
    resources :graphs, only: %i[index show create]
    resources :templates, only: %i[index show create]
    resources :cities, only: %i[index show]
    get "check_login", to: "user_sessions#check_login"
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
