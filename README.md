
# Mapevent 

Web application to create and show existing social events on map.

A full stack React.js and Ruby on Rails web application was built to them who don't want miss important social events. 


Chack Mapevent app on [heroku link](http://mapevent.herokuapp.com/)

## Features

Provides just one step to see events on the map. Events can be filtered by category as needed. Each event has different icons on map depend on category wich makes easier to find events by enterests. Have been used Google Oath API to login or create new user. User simply can create, edit his own events. User can save other people events as favorite. 

## Built with

## Backend

Ruby [2.6.1]
Rails [~> 5.2.3] - MVC web framework used as an API
PostgreSQL [>= 0.18, < 2.0] - Database
bcrypt [~> 3.1.7] - Gem for encryption and securing user passwords
Figaro - Rails gem for securing API Keys
Active Model Serializers - Serializing API routes to JSON
JWT - securing tokens
Heroku - App deployment

## FrontEnd

React.js
React Router - Declarative Routing
Google Maps API
Google Geocoding API
Google Oauth API

Styling:
CSS
Semantic framework
Bootstrap framework


## Prerequisites
Before you begin, ensure you have installed the latest version of:

Ruby
Rails
PostgreSQL
Node.js and npm

## API Reference
This web app uses the following APIs:

### Google Maps API
Google Maps API keys you can get -> [here](https://developers.google.com/maps/documentation/javascript/get-api-key?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_284472093831-ADGP_Hybrid+%7C+AW+SEM+%7C+BKWS+~+Google+Maps+API+Key-KWID_43700035216023647-kwd-313687191537-userloc_9067609&utm_term=KW_%2Bgoogle%20%2Bmaps%20%2Bapi%20%2Bkey-ST_%2Bgoogle+%2Bmaps+%2Bapi+%2Bkey&gclid=Cj0KCQiAt_PuBRDcARIsAMNlBdrjR4HVVlcfqTS29UDi3VjdZ-4U0fDSmE-F44GXmDCd3G-Ad8VIzkkaAkhoEALw_wcB)

### Google Geocoding API
Google Maps API keys you can get -> [here](https://developers.google.com/maps/documentation/geocoding/start?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_315916118282-ADGP_Hybrid+%7C+AW+SEM+%7C+SKWS+~+Geocoding+API-KWID_43700039136946654-kwd-301485308042-userloc_9067609&utm_term=KW_%2Bgeocoding%20%2Bapi-ST_%2Bgeocoding+%2Bapi&gclid=Cj0KCQiAt_PuBRDcARIsAMNlBdq7KscrTk0gzMuF39ZPF2QA7w6Hc5DwLzMaMbn--aHsAAzvjoW25hcaApOnEALw_wcB)

### Google Oauth API client_id you can get -> [here](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin) 


## Installing
Backend Installation, please click [here](https://github.com/Gulnoz/EventsOnMapBackend)

Frontend Installation:

Clone this repo to your local machine git clone <this-repo-url>
cd to frontend directory
Ensure your Backend API is running at http://localhost:3000/
run npm install to install all dependencies
run npm start to start server
When prompted, ensure Frontend is running at http://localhost:3001
  


