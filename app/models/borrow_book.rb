class BorrowBook < ApplicationRecord
  after_create :after_borrow_update
  before_create :set_deadline_book
  after_destroy :after_return_update
  before_destroy :check_penalized

  belongs_to :book
  belongs_to :member

  validate :check_before_borrow

  private
  def after_borrow_update
    book.update(stock:0)
    member.update(book_borrowed_count: member.book_borrowed_count + 1)
  end

  def after_return_update
    book.update(stock:1)
    member.update(book_borrowed_count: member.book_borrowed_count - 1)
  end

  def check_before_borrow
    errors.add(:base, 'Book is out of stock') if book.stock == 0
    errors.add(:base, 'Maximum 2 Borrowed Book every 1 Member') if member.book_borrowed_count==2
    if member.is_penalized
      if member.penalty_until_date.present? && member.penalty_until_date > Date.today
        errors.add(:base, 'Member is currently penalized and cannot borrow books until the penalty period is over.')
      else
        member.update(is_penalized: false, penalty_until_date: nil)
      end
    end
  end

  def check_penalized
    member.update(is_penalized: true, penalty_until_date: DateTime.now + 3.day) if self.deadline_book < DateTime.now
  end
  
  def set_deadline_book
    self.deadline_book = DateTime.now + 7.day
  end
end
