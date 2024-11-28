class Pet < ApplicationRecord
  belongs_to :user
  has_many :appointments, dependent: :destroy
  has_many :invoices, dependent: :destroy
  has_many :additional_incomes, dependent: :destroy

  has_one_attached :profile_pic

  # Validations
  validates :name, presence: true
  validates :address, presence: true
  validates :supplies_location, presence: true
  validates :behavorial_notes, presence: true
  validates :birthdate, presence: true
  validate :birthdate_in_past

  # Profile Picture URL
  def profile_pic_url
    if profile_pic.attached?
      Rails.application.routes.url_helpers.rails_blob_path(profile_pic, only_path: true)
    else
      'https://cdn4.iconfinder.com/data/icons/dog-breed-minimal-outline/512/Border_collie-512.png'
    end
  end

  private

  def birthdate_in_past
    if birthdate.present? && birthdate > Date.current
      errors.add(:birthdate, "can't be in the future")
    end
  end
end