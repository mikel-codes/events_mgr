class Customer < ApplicationRecord
    has_many :customeritems, dependent: :destroy
    attr_accessor :fullname, :phone, :sex, :unique_id, :email
    
    before_save { self.email= email.downcase!, self.fullname = fullname.downcase! }
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    VALID_PHONE_REGEX = /[+]?\d[0-9]/i


    validates :sex, inclusion: { in: %w(male female),
        message: "%{value} is not a valid gender or sex type" }, allow_nil: false
    
    validates :phone, :fullname, :sex, :unique_id, :presence => true

    validates :email, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }, allow_nil: true

    validates :phone, :format => {with: VALID_PHONE_REGEX}, :length => { :minimum => 10, :maximum => 15 }

    validates :unique_id, :uniqueness=> true
  
       
end
