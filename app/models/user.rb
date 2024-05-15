class User < ApplicationRecord
  authenticates_with_sorcery!

  validates :password,              length: { minimum: 6, maximum: 20 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password,              confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
  validates :username,              presence: true, length: { maximum: 15 }
  validates :email,                 presence: true, uniqueness: true, length: { maximum: 255 }
  validates :occupation,            presence: true

  enum occupation: { 
    high_geography: 0, high_social: 1, high_others: 2, junior_social: 3, junior_others: 4, elementary: 5, 
    college_geography: 6, college_others: 7, other_teacher: 8, aspirant: 9, others: 10 }
end
