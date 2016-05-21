class Role < ActiveRecord::Base
  has_many :users

  ROLES = {
    superuser: Role.find_by_identifier('superuser').id,
    admin: Role.find_by_identifier('admin').id,
    community_user: Role.find_by_identifier('community_user').id
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