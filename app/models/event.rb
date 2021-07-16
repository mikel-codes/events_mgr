class Event < ApplicationRecord
    validates_presence_of :event_type, :event_date ,:title,:host, :speaker, :published
    validates_uniqueness_of :event_type
end
