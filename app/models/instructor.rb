class Instructor < ActiveRecord::Base
  has_many :videos
end