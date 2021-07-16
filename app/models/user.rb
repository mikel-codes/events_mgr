class User < ApplicationRecord
    has_secure_password
    has_many :todos, foreign_key: :created_by
    has_many :customers, foreign_key: :unique_id
    validates_presence_of :fullname, :username, :email, :password_digest
end
