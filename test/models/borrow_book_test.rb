require "test_helper"

class BorrowBookTest < ActiveSupport::TestCase
  setup do
    @book = books(:one) # Assuming you have a fixture or factory for books
    @member = members(:one) # Assuming you have a fixture or factory for members
  end

  test "should save borrow_book with valid book and member" do
    borrow_book = BorrowBook.new(book: @book, member: @member)
    assert borrow_book.save, "Failed to save the borrow_book with valid book and member"
  end

  test "should set deadline_book to 7 days from now" do
    borrow_book = BorrowBook.create(book: @book, member: @member)
    assert_equal DateTime.now.to_date + 7.days, borrow_book.deadline_book.to_date
  end


  test "should update book stock after returning" do
    borrow = BorrowBook.create(book: @book, member: @member)
    borrow.destroy
    @book.reload
    assert_equal 1, @book.stock, "Book stock was not updated after returning"
  end

  test "should not borrow book if stock is 0" do
    @book.update(stock: 0)
    borrow_book = BorrowBook.new(book: @book, member: @member)
    assert_not borrow_book.save, "Saved the borrow_book with book stock 0"
    assert_includes borrow_book.errors.full_messages, 'Book is out of stock'
  end

  test "should not borrow book if member is penalized" do
    @member.update(is_penalized: true, penalty_until_date: DateTime.now + 1.day)
    borrow_book = BorrowBook.new(book: @book, member: @member)
    assert_not borrow_book.save, "Saved the borrow_book when member is penalized"
    assert_includes borrow_book.errors.full_messages, 'Member is currently penalized and cannot borrow books until the penalty period is over.'
  end
end
