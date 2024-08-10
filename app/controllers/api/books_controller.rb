module Api
  class BooksController < ApplicationController
    def show
      book = Book.where('stock > ?', 0)
      render json: book, status: :ok
    end

    def create
      book = Book.new(book_params)
      if book.save
        render json: book, status: :created
      else
        render json: { error: book.errors.full_messages }, status: :internal_server_error
      end
    end

    def update
      render json: { note: "Bad Request"}, status: :bad_request
    end

    def destroy
      render json: { note: "Bad Request"}, status: :bad_request
    end

    private

    def book_params
      params.require(:book).permit(
        :code, :title, :author, :stock
      )
    end
  end
end
