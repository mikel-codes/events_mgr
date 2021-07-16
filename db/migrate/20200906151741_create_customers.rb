class CreateCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :customers do |t|
      t.string :fullname
      t.string :sex
      t.string :phone
      t.integer :unique_id
      t.string :email

      t.timestamps
    end
  end
end
