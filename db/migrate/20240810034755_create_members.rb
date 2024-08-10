class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.string :code
      t.string :name
      t.integer :book_borrowed_count
      t.boolean :is_penalized

      t.timestamps
    end
  end
end
