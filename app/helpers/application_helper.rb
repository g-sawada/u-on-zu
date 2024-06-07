module ApplicationHelper
  def flash_background_color(type)
    case type.to_sym
    when :info then "bg-info"
    when :success then "bg-success"
    when :warning  then "bg-warning"
    when :error  then "bg-error"
    else "bg-gray-500"
    end
  end


  def default_meta_tags
    {
      site: 'U-ON-ZU!',
      reverse: true,
      separator: '|',
      og: defalut_og,
      twitter: default_twitter_card
    }
  end
  
  private
  
  def defalut_og
    {
      title: :full_title,          # :full_title とすると、サイトに表示される <title> と全く同じものを表示できる
      description: :description,   # 上に同じ
      url: request.url,
      image: 'https://example.com/hoge.png'
    }
  end
  
  def default_twitter_card
    {
      card: 'summary_large_image', # または summary
      site: '@hogehoge'            # twitter ID
    }
  end

end
