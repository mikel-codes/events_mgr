Rails.application.routes.draw do
  #namespace :api do
    #get 'events/index'
    #post 'events/create'
    #get '/show/:id', to: "events#show"
   # delete '/destroy/:id', to: "events#destroy"
  #end
  #root to: redirect('/events')
 # get '/*path' => 'site#index'
#end
  root to: redirect('/events')
  get 'events', to: 'site#index'
  get 'events/new', to: "site#index"
  get 'events/:id', to: "site#index"
  get 'events/:id/edit', to: "site#index"
  namespace :api do
    resources :events, only: %i[index show create update delete]
  end
  resources :todos do
    resources :items
  end
end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html


