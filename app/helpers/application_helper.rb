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
end
