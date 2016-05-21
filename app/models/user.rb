class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable
         # :omniauthable
  belongs_to :role

  after_create :set_default_role

  private

  def set_default_role
    self.role = Role.find_by identifier: "community_user"
  end
end
