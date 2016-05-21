class Role < ActiveRecord::Base
  has_many :users

  ROLES = {
    superuser: 1,
    admin: 2,
    community_user: 3
  }

  def superuser?
    self.id == ROLES[:superuser]
  end

  def admin?
    if self.id == ROLES[:admin] || self.id == ROLES[:superuser]
      return true
    end

    return false
  end

end