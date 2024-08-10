require "test_helper"

class MemberTest < ActiveSupport::TestCase
  test "can create member with complete request" do
    member = Member.new(code:'A', name:'algi', book_borrowed_count:0, is_penalized:false, penalty_until_date: DateTime.now)
    assert member.save
  end
  test "cannot create member with blank book_borrowed_count" do
    member = Member.new(code:'A', name:'algi', is_penalized:false)
    assert_not member.save
  end
  test "can create member with blank is_penalized" do
    member = Member.new(code:'A', name:'algi', book_borrowed_count:0)
    assert member.save
  end
  test "can create member with blank penalty_until_date" do
    member = Member.new(code:'A', name:'algi', book_borrowed_count:0, is_penalized:false)
    assert member.save
  end
  test "cannot create member with blank code" do
    member = Member.new(name:'algi', book_borrowed_count:0, is_penalized:false)
    assert_not member.save
  end
  test "cannot create member with blank name" do
    member = Member.new(code:'A', book_borrowed_count:0, is_penalized:false)
    assert_not member.save
  end
end
