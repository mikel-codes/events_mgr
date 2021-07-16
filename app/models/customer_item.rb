class CustomerItem < ApplicationRecord
  belongs_to :customer
  attr_accessor :description, :name, :count, :price
  validates_presence_of :description, :name, :count, :price
  validates :count, :numericality=>true
  validates :price, numericality: {integer: true, :scale => 2, greater_than_or_equal_to: 0.01}    
end
