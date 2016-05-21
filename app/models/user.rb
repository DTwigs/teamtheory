class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable
         # :omniauthable
  belongs_to :role

  after_create :set_default_role

  scope :confirmed, -> { where.not(confirmed_at: nil) }

  def confirmed?
    self.confirmed_at.present?
  end

  def active?
    self.is_active == true
  end

  #this method is called by devise to check for "active" state of the model
  def active_for_authentication?
    #remember to call the super
    #then put our own check to determine "active" state using
    #our own "is_active" column
    super and self.is_active?
  end

  private

  def set_default_role
    self.role = Role.find_by identifier: "community_user"
  end
end



