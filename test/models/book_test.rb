require "test_helper"

class BookTest < ActiveSupport::TestCase
  test "Create Book with complete request" do
    book = Book.new(code:'A', title:'this is title', author:'algi', stock:1)
    assert book.save
  end
  test "Cannot create book if code blank" do
    book = Book.new(title:'this is title', author:'algi', stock:1)
    assert_not book.save
  end

  test "Cannot create book if title blank" do
    book = Book.new(code:'A', author:'algi', stock:1)
    assert_not book.save
  end

  test "Cannot create book if author blank" do
    book = Book.new(code:'A', title:'this is title', stock:1)
    assert_not book.save
  end

  test "Cannot create book if stock blank" do
    book = Book.new(code:'A', title:'this is title', author:'algi')
    assert_not book.save
  end
end
