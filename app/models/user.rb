class User < ApplicationRecord
  authenticates_with_sorcery!

  validates :password,              length: { minimum: 6, maximum: 20 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password,              confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
  validates :username,              presence: true, length: { maximum: 15 }
  validates :email,                 presence: true, uniqueness: true, length: { maximum: 255 }
  validates :occupation,            presence: true

  enum occupation: {
    student_elementary: 0, student_junior: 1, student_high: 2, student_college: 3, teacher_high_geography: 4,
    teacher_high_social: 5, teacher_high_others: 6, teacher_junior_social: 7, teacher_junior_others: 8,
    teacher_elementary: 9, researcher_geography: 10, researcher_others: 11, teacher_others: 12,
    company_education: 13, company_others: 14, others: 15
  }
end
