class Ability
  include CanCan::Ability

  def initialize(user)
    
    user ||= User.new # guest user (not logged in)

    if user.role.identifier == "superuser"
      can :manage, :all
    elsif user.role.identifier == "admin"
      can :manage, :all
    else
      can :read, Videos
    end

  end
end
