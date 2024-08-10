Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  namespace :api do
    resource :books
    resource :members do
      member do
        post :borrow
        delete :return_book
      end
    end
  end
end
