class Book < ApplicationRecord
  has_many :borrow_books

  validates :code, :title, :author, :stock, presence: true
  validates :code, uniqueness: true
  validates :stock, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
