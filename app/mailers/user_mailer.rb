class UserMailer < ApplicationMailer
  default from: 'from@example.com'

  def reset_password_email(user)
    @user = User.find(user.id)
    @url = edit_password_reset_url(@user.reset_password_token)
    mail(
      from: 'U-ON-ZU! お知らせメール <info@u-on-zu.com>'
      to: user.email,
      subject: 'パスワード再設定のお手続き')
  end
end
