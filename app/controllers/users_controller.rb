class UsersController < ApplicationController
    before_action :current_user

    skip_before_action :authorized, only: [:create, :index]

    def create
        user = User.create(user_params)
        if user.valid?
            render json: user, status: :created
            session[:user_id] = user.id
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        users = User.all
        if users
            render json: users
        else
            render json: {  error: "Not found" }, status: :not_found
        end
    end

    def show
        user = User.includes(pets: [], appointments: [:invoices, :cancellations]).find(session[:user_id])
        render json: user, include: {
          pets: {},
          appointments: {
            include: [:invoices, :cancellations]
          }
        }
      end

    def change_rates

        user = User.find(session[:user_id])

        user.update(rates_params)

        if user.valid?
            render json: user
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :name, :email_address, :pets, :thirty, :fourty, :sixty, :solo_rate)
    end

    def rates_params
        params.permit(:thirty, :fourty, :sixty, :solo_rate)
    end
end
