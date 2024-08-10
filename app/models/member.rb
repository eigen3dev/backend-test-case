class Member < ApplicationRecord
  before_create :set_member_default

  has_many :borrow_books

  validates :code, :name, :book_borrowed_count, presence: true
  validates :code, uniqueness: true
  validates :book_borrowed_count, numericality: { only_integer: true, less_than_or_equal_to: 2}
  validates :book_borrowed_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }


  private
  def set_member_default
    self.book_borrowed_count = 0
    self.is_penalized = false
  end
end
