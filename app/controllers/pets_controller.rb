class PetsController < ApplicationController
    before_action :current_user
  
    def create
      pet = @current_user.pets.create(pet_params)
      if pet.valid?
        render json: pet_with_profile_pic(pet), status: :created
      else
        render json: { errors: pet.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def index
      pets = @current_user.pets
      if pets.any?
        render json: pets.map { |pet| pet_with_profile_pic(pet) }, status: :ok
      else
        render json: { error: "No pets found" }, status: :not_found
      end
    end
  
    def update
      pet = @current_user.pets.find_by(id: params[:id])
      if pet
        pet.update(pet_params_update)
        if pet.valid?
          render json: pet_with_profile_pic(pet), status: :ok
        else
          render json: { errors: pet.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Pet not found" }, status: :not_found
      end
    end
  
    def destroy
      pet = @current_user.pets.find_by(id: params[:id])
      if pet
        pet.destroy
        render json: { message: "Pet deleted successfully" }, status: :ok
      else
        render json: { error: "Pet not found" }, status: :not_found
      end
    end
  
    def update_active_status
      pet = @current_user.pets.find_by(id: params[:id])
      if pet
        pet.update(active: params[:active])
        render json: pet_with_profile_pic(pet), status: :ok
      else
        render json: { error: "Pet not found" }, status: :not_found
      end
    end
  
    private
  
    def pet_params
      params.require(:pet).permit(
        :user_id, :name, :spayed_neutered, :supplies_location,
        :behavorial_notes, :birthdate, :sex, :allergies, :address, :profile_pic
      )
    end
  
    def pet_params_update
      params.permit(
        :user_id, :name, :active, :spayed_neutered, :supplies_location,
        :behavorial_notes, :birthdate, :sex, :allergies, :address, :profile_pic, :id
      )
    end
  
    # Helper to include profile_pic_url in the JSON response
    def pet_with_profile_pic(pet)
      pet.as_json.merge(profile_pic_url: pet.profile_pic_url)
    end
  end 