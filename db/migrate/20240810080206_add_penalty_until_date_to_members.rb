class AddPenaltyUntilDateToMembers < ActiveRecord::Migration[7.0]
  def change
    add_column :members, :penalty_until_date, :datetime
  end
end
