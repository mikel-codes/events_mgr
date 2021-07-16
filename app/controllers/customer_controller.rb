class CustomerController < ApplicationController
        before_action :set_customer, only %i[:show :update :destroy]
    
        #GET /customers
        def index
            customers = Customer.all
            json_response(customers)
        end
    
        #POST /customers
        def create
            customer = Customer.create!(todo_params)
            if customer.valid?
                json_response(customer, :created)
            else
                json_response(customer.errors)
            end
        end
    
        #GET /customers/:id
        def show
            json_response(@customer)
        end
    
        #PUT /customers/:id
        def update
            @customer.update(todo_params)
            head :no_content
        end
    
        #DELETE /customers/:id
        def destroy
            @Customer.destroy
            head :no_content
        end
    
    
        private
    
        def todo_params
            params.require(:customer).permit(:name, :created_by)        
        end
    
        def set_customer
            @customer = customers.find_by(:id)
        end

    
end
