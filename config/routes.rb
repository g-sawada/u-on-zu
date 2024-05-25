Rails.application.routes.draw do
  root "static_pages#top"
  get "develop", to: "static_pages#develop"
  get "login", to: "user_sessions#new"
  post "login", to: "user_sessions#create"
  delete "logout", to: "user_sessions#destroy"
  get "mypage", to: "profiles#show"
  get "mypage/edit", to: "profiles#edit"
  patch "mypage", to: "profiles#update"
  get "canvas", to: "canvas#index"
  
  resources :users, only: %i[new create destroy]
  resources :graphs, only: %i[index show destroy]
  resources :templates, only: %i[index destroy]
  resources :cities, only: %i[index]

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
