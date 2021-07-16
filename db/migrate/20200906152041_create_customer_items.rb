class CreateCustomerItems < ActiveRecord::Migration[6.0]
  def change
    create_table :customer_items do |t|
      t.text    :description
      t.string  :name
      t.integer :count
      t.float   :price
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
