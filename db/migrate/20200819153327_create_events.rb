class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :event_type
      t.string :event_date
      t.string :title
      t.text :speaker
      t.string :host
      t.boolean :published

      t.timestamps
    end
  end
end
