FactoryBot.define do 
    factory :items do 
        name {Faker::Starwars.character}
        done false
        todo_id nil
    end
end