require 'active_support/concern'
class ApplicationController < ActionController::Base
    protect_from_forgery unless: -> { request.format.json? }

    include JsonResponse
    #include ExceptionHandler
end
