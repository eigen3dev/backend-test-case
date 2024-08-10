require 'swagger_helper'

RSpec.describe 'api/books', type: :request do
  path '/api/books' do

    get('list books') do
      tags 'Books'
      produces 'application/json'

      response(200, 'successful') do
        schema type: :array,
               items: {
                 type: :object,
                 properties: {
                   id: { type: :integer },
                   title: { type: :string },
                   author: { type: :string },
                   stock: { type: :integer }
                 }
               }

        run_test!
      end
    end

    post('create book') do
      tags 'Books'
      consumes 'application/json'
      parameter name: :book, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string },
          author: { type: :string },
          stock: { type: :integer }
        },
        required: [ 'title', 'author', 'stock' ]
      }

      response(201, 'created') do
        run_test!
      end
    end
  end
end
