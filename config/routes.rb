Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }

  root 'welcome#index'

  resources :courses

  namespace :admin do
    root to: 'home#index'
  end

end
