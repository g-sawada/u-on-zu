class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :authentications, dependent: :destroy
  has_many :graphs, dependent: :destroy
  has_many :templates, dependent: :destroy

  accepts_nested_attributes_for :authentications

  validates :password,              length: { minimum: 6, maximum: 20 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password,              confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
  validates :username,              presence: true, length: { maximum: 30 }
  validates :email,                 presence: true, uniqueness: true, length: { maximum: 255 }
  validates :occupation,            presence: true

  enum occupation: {
    student_elementary: 0, student_junior: 1, student_high: 2, student_college: 3, teacher_elementary: 4,
    teacher_junior_social: 5, teacher_junior_others: 6, teacher_high_geography: 7, teacher_high_social: 8,
    teacher_high_others: 9, researcher_geography: 10, researcher_others: 11, teacher_others: 12,
    company_education: 13, company_others: 14, others: 15
  }

  # ユーザー登録時にデフォルトのテンプレートを作成
  def create_default_templates!
    template_file_path = Rails.root.join('db', 'initial_templates.json')
    template_json = File.read(template_file_path)
    template_data = JSON.parse(template_json)

    template_data.each do |data|
      template = self.templates.new(title: data['template_title'])
      graph_setting = template.build_graph_setting(settings: data['settings'])
      template.save!
      graph_setting.save!
    end
  end
end
