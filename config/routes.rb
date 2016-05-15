Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }

  root 'welcome#index'

  resources :courses

  resources :admin, :only => [:index]

end
