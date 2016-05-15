class Role < ActiveRecord::Base
  has_many :users

  def superuser?
    self.identifier == "superuser"
  end

  def admin?
    if self.identifier == "admin" || "superuser"
      true
    else
      false
    end
  end

end