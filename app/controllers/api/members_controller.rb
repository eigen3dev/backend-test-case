module Api
  class MembersController < ApplicationController
    before_action :set_member_and_book, only: %i[borrow return_book]

    def show
      render json: Member.all, status: :ok
    end

    def create
      member = Member.new(member_param)
      if member.save
        render json: member, status: :created
      else
        render json: { errors: member.errors.full_messages }, status: :internal_server_error
      end
    end

    def borrow
      if @member.present? && @book.present?
        borrow = BorrowBook.new(book: @book, member: @member)
        if borrow.save
          render json: borrow, status: :created
        else
          render json: { error: borrow.errors.full_messages}, status: :internal_server_error
        end
      else
        render json: { error: "Book or Member not found"}, status: :not_found
      end
    end

    def return_book
      borrow = BorrowBook.find_by(book: @book, member: @member)
      if borrow.present?
        if borrow.destroy
          render json: { note: "Book Returned" }, status: :ok
        end
      else
        render json: { error: "No Borrow Data"}, status: :not_found
      end
    end

    def update
      render json: { note: "Bad Request"}, status: :bad_request
    end

    def destroy
      render json: { note: "Bad Request"}, status: :bad_request
    end


    private

    def member_param
      params.require(:member).permit(
        :code, :name
      )
    end

    def set_member_and_book
      @member = Member.find_by(code: params[:code_member])
      @book = Book.find_by(code: params[:code_book])
    end
  end
end
