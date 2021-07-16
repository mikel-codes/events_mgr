class CustomerItemsController < ApplicationController
    before_action :set_customer
    before_action :set_customer_item

    def index
        json_response(@customer.customeritems.all)
    end

    def show
    end

    private 
    def customer_items_params
        params.permit(:type, :name, :price, :count)
    end

    def set_customer
        @customer = Customer.find_by(id: params[:id])

    end

    def set_customer_item
        @item = Customer.find_by
    end
end
