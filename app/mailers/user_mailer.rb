class UserMailer < ApplicationMailer
  def reset_password_email(user)
    @user = User.find(user.id)
    @url = edit_password_reset_url(@user.reset_password_token)
    mail(
      from: Rails.env.production? ? 'U-ON-ZU! お知らせメール <info@u-on-zu.com>' : 'from@example.com',
      to: user.email,
      subject: 'パスワード再設定のお手続き')
  end
end
