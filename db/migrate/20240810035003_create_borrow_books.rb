class CreateBorrowBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :borrow_books do |t|
      t.integer :book_id
      t.integer :member_id
      t.datetime :deadline_book

      t.timestamps
    end
  end
end
