# Petfinder-React-App
 Web Application that allows Pet Shelters to upload their animals to a database, filtering data to a seperate portion of the application designer for pet-owners looking to adopt. The Application is divided into 2 parts. Shelter Application, Pet-Owner Application.
 
# Backend
Backend developed using MongoDB, Mongoose, nodeJS. Using libraries such as Multer and GridFS to allow image upload and parsing into different collections.

# Shelter Application
Shelter Frontend developed using React.js, MaterialUI, Axios, Router-Dom, material-ui-chip-input
This Portion of the App allows Shelters to be able to register/login, only see what animals that specific shelter has showing for the Pet-Owner (tinder-style) application, add animals, edit existing animals, delete animals who have gotten adopted etc. This portion directly feeds the backend which then displays on the pet-owner section.

Try the Demo.
Guest Login
Username: guest@gmail.com
Password: guest

Feel free to create a new account (oAuth not enabled so the email address doesn't have to be valid). Passport is enabled to hash/salt passwords, but email links are not implemented.

[Demo](https://petfinder-react-app.web.app/)

# Pet Owner Application
UNDER DEVELOPMENT

Currently the pet-owner (Tinder Style) Section is under development and will be posted within the next week. 

Synopsis of the application: Pet Owners looking to adopt can make an account, type in their zipcode and shelters near the zipcode will have their animals displayed in a tinder card style fashion. Users can swipe right if they are interested in adopting, swipe left if they are not interested, and click to view more photos and information. Upon swiping right the users have "hearted" an animal. This allows them to click the favorite tab and see which animals they liked. Viewing the animal profile will show the shelter address and telephone number to contact the shelter. 

