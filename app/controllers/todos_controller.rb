class TodosController < ApplicationController
    before_action :set_todo, only %i[:show :update :destroy]

    #GET /todos
    def index
        todos = Todo.all
        json_response(todos)
    end

    #POST /todos
    def create
        todo = Todo.create!(todo_params)
        if todo.valid?
            json_response(todo, :created)
        else
            json_response(todo.errors)
        end
    end

    #GET /todos/:id
    def show
        json_response(@todo)
    end

    #PUT /todos/:id
    def update
        @todo.update(todo_params)
        head :no_content
    end

    #DELETE /todos/:id
    def destroy
        @todo.destroy
        head :no_content
    end


    private

    def todo_params
        params.require(:todo).permit(:name, :created_by)        
    end

    def set_todo
        @todo = Todos.find_by(:id)
    end
end
