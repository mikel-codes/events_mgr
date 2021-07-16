class JsonWebToken
    HMAC_SECRET = Rails.application.secrets.secret_key_base
    def self.encode(payload, exp=24.hours.from_now)
        # set expiry to 24hrs from creation time
        payload[:exp] = exp.to_i

        #sign token with application secret
        JWT.encode(payload, HMAC_SECRET)
    end

    def self.decode(token)
        #get payload; first indexed in decoded Array
        body = JWT.decode(token, HMAC_SECRET)[0]
        HashWithIndifferentAccess.new body
    rescue JWT::DecodeError => e
        raise ExceptionHandler::InvalidToken, e.message
    end
end