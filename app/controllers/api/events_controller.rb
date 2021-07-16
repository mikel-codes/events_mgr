class Api::EventsController < ApplicationController
  before_action :set_event, only: [:show ,:delete ,:update]
  def index
    events = Event.all.order(created_at: :desc)
    json_response(events)
  end

  def show
    json_response(event)
  end

  def delete
    respond_with Event.destroy(params[:id])
  end

  def create
    event = Event.create(event_params)
    if event.valid?
      json_response(event, :created)
    else
      json_response(event.errors)
    end
  end

  def update
    event.update(event_params)
    head :no_content
  end

  private
  def event_params
    params.require(:event).permit(
      :id,
      :event_type,
      :event_date,
      :title,
      :host,
      :speaker,
      :published
    )
  end

  def set_event
    @event = Event.find_by(:id)
  end
end
