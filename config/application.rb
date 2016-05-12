require File.expand_path('../boot', __FILE__)

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"
require 'sprockets/es6'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Teamtheory
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    config.assets.enabled = true

    # Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'

    # Precompile javascripts
    config.assets.precompile = [ Proc.new { |path| !%w(.js .css).include?(File.extname(path)) } ]
    config.assets.precompile += %w( admin.js vendor_lib.js vendor_lib_v2.js application.js application_v2.js dynamic/* polyfills/* )
    config.assets.precompile += Dir.glob(Rails.root.join('app/assets/javascripts/dynamic/*.coffee')).map { |f| 'dynamic/' + File.basename(f, '.coffee') }

    # Precompile stylesheets
    config.assets.precompile += %w( application.css application_v2.css ie9.css admin.css )
    config.assets.precompile += Dir.glob(Rails.root.join('app/assets/stylesheets/sections/*.scss')).map { |f| 'sections/' + File.basename(f, '.scss') }

  end
end
