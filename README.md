Hi !

My name is Maxim Tsvetkov and welcome to my ecommerce shop and my final HackerU Full-Stack project !

- Interduction:
  This project is designed for a neighbor of mine - Ariella, that long time ago asked me to create a new project that will help her sell her many books that she read and collected among the years.<br/>
  Ariella is huge reading fan that within the years read thousands of books and it was time to make room in the house and also a new place for all new books that should be purchased.<br/>
  Common platforms like Facebook Market and Yad2 created difficulties with the purchase proccess because of the great variety, therefore a website was needed to make the purchase much more simple.<br/>

- About this project:
  I created 2 different websites - one for the clients and one for the admin. <br/>
  The admin web site was created to laptop purposes, so its responsibility is a bit limited. <br/>
  The reason it was created is that way - was the need of the client for big screen view (sight problems ..). This why I tried to create a different website with more fitchers and less responsible.<br/>
  The admin will be able to controll the inventory and easily upload new items and control the orders. <br/>
  Both the admin and the client web sites are synchronized and live information between the seller and the client will be available.

------------------------ How to log in to admin site --------------------------------<br/>
admin site:<br/>
username: a@a.com<br/>
password: lala123

------------------------ How to log in to PuTTy: --------------------------------<br/>
I used PuTTy for the server and its details to log in wil be:<br/>
185.229.226.27, port:22, login as:root, password: MaximMor251199<br/>
Then you write: cd .. -> cd var/www/book-store-server/ -> node sever.js

------------------------ How to log in to mongo compass: --------------------------------<br/>
mongodb://admin:MorMafhidaBesharatim23%23%23@185.229.226.27:27017/BookStore?authSource=admin

I opened a sever with Kamatera Cloud Solutions to learn how to create a server and upload it, so I'll could learn more and beyond the local host.<br/>
The server will be olways on and if there will be any problem and the server will off for some reason .. please contact me right away and ill fix that ! <br/>
**052-774-1590**

Unregistered users - can navigate in the client website and view the the products and the sites documentation.

Registered users - can purchace items, change their account details, view their order details (the login status is updating from the admin website).

Admin wesite:

- has a first statistics page (currently with fake stats, but soon with correct data all will be updated).
- has a second add book page with a small book preview.
- has a third view of all the users.
- has a fourth view of all the book - can edit and delete the book.
- fifth and last is the orders page, where the admin gets all his orders, can sort them and change their status (that will be updated for him and for the client), and also can press "..." and view the order.

-------------------------------------------------------------------------------------------------------------------- <br/>
about project assignments and documentation: <br/>

Client side technology requirements:

1. Design and Responsiveness:
   It is recommended to use the Bootstrap or Design Material library. <br/>
   **I used bootstarp and MUI in this project.**

2. The design file:
   If the design file (css) is over 100 lines, it must be divided into files
   separate according to the subjects. For this purpose it is recommended to use the scss library. <br/>
   **I used separated css files and also included the design inside the files using wrappers.**

3. Icons:
   It is recommended to use sample icons from the fontawesome material bootstrap library
   and the like.. <br/>
   **I used MUI icons and fontawesome icons.**

4. An entry page:
   Should include a main title, a secondary title, an image text that will match the nature of the site/the app.
   If it is a website of any online store, a search field must be displayed on the opening page with at least three card codes.
   The landing page should be clear for what type of website/app we have arrived to and should be designed in such a way that invites the users to register. <br/>
   **I have completed all the necessary in this part.**

5. Navigation menu:
   On the website/application to contain a dynamic navigation menu that is common to all website pages. <br/>
   **This project has a navbar and a side bar for this project.**

6. Footer:
   On the website / application to contain a footer with a logo, copyright and means of contacting the site.
   If necessary, also add links to social media or anything else in the navigation menu to match this area in the application/site. <br/>
   **This project has a footer with all the necessary instructions.**

7. Accessibility:
   Put the name of the application in the title tag in the forms index file, as well as an image/
   Logo in favicon: link.
   Each image must include the alt attribute with a caption that describes the image. <br/>
   **This project has a all the necessary as described in this part.**

8. About page:
   You must create an about page in which you provide an in-depth explanation of the site and how to deal with it. <br/>
   **This project has a all the necessary as described in this part.**

9. Forms:
   Uniformity must be maintained in the design of all forms on the site. <br/>
   Validations must be made on all fields. <br/>
   A visual indication must be given below the field being entered if the user is standing or does not meet the field validation requirements.
   Sending of the forms should be allowed only after reason mandatory fields are complete.  
    The user must be updated on the success or failure of sending from the form and in case of success, it should be moved to the relevant page. <br/>
   **This project has a all the necessary as described in this part.**

10. Registration and membership:
    On the client side interface to display the login page and the title membership registration page eligibility and a form for registration/login.<br/>
    Regex must be used for password fields in forms, which requires entering a password with at least one uppercase and one lowercase letter in English, at least four
    numbers and a special sign from among the following signs (!@%$#^&\_-\_\_) In addition, all passwords must include at least 8 characters. <br/>
    **This project has a all the necessary as described in this part.**

11. Token:
    After a successful login, you must receive a token from the server with an encrypted value using the library
    jwt and save it in localStorage. The information encrypted within it must be used in order to determine the
    The user's permissions.
    A visual indication must be given according to the user's login status.
    Do not save sensitive user information such as email and password inside the token even if it is encrypted. <br/>
    **This project has a all the necessary as described in this part.**
    **The client side has the token login, and the admin side for now has only regular login because i want to continue my reseach and later add maybe stronger login option.**

12. Crud:
    After logging in, the user must allow the crud operations, i.e.: read, create, update and deletion of content.
    The content you create should be available in different parts of the site.
    For example if it is in an online store, after you add a product it should appear on the forms page or the products page.
    There is to give a visual indication to the user about the success/failure of performing the crud operations.<br/>
    **In this project, the user can create, read, and update data, but doesnt have an option to delete.**
    **The admin web side has the option to delete "cards" and for now I dont want to able the admin to delete users.**

13. Favorites/Input to shopping basket:
    The user must be given the option to save content (card/code/user) etc. in favorites.
    A visual indication must be given that the content is preferred by the user.
    The preferences must be saved in a database so that it doesn't matter from which device a user accesses the site/content application he preferred will continue to be preferred.
    A page of favorite content must be created, where the user can see everything.
    The details he has marked as favorites and if he wants he can get favorite items from the page.<br/>
    **This project has a all the necessary as described in the client site.**

14. Content details page:
    By clicking on a card/user/content, the user will go to a dynamic page where details will be given to the content item the user clicked on.<br/>
    **This project has a all the necessary as described in "edit info" part.**

15. Search field:
    A search field must be created for the content (card/code/user, etc).<br/>
    **This project has a all the necessary as described in "products" part and also in the admin site in "cards" and "users".**

16. Privileges:
    The creation of at least two types of users must be allowed, the first when it is a regular user and the other is admin.
    Only a user defined as an admin will be able to create, edit and delete content, while that a normal user can only see or mark content as their favorite.<br/>
    **It is possible to create regular users, that can read the data and edit their info,**
    **and the admin site allows to delete and update all the products and add new items.**

17. HTTP calls:
    HTTP calls must be made on the server side from the client side and through them send information from the server.
    For this purpose the Axios library must be used.
    The catch and try mechanism must be used in readings server-side asynchronicity in case you use asynchronous functions, or substitutes in the mechanism
    ()catch.()then. And this is so that the code does not break by chance and a critical error is returned from the server.<br/>
    **This project has a all the necessary as described in this part.**

18. Architecture:
    A logical and industry-accepted order of files must be maintained.
    The code must be clean and readable, With correct division into folders and components.<br/>
    **This project has a all the necessary as described in this part.**

19. Console:
    Be sure to work correctly with the console.
    The consul must be free of warning notes, errors and content, so critical errors can be easily seen from the server.<br/>
    **This project has a all the necessary as described in this part.**

20. Content filtering:
    The client has the option to filter the content displayed on a certain page according to different parameters.<br/>
    **This project has a all the necessary as described in the client -> products part.**

21. Display modes:
    It must be possible to switch between different information displays of the content displayed to the client.
    (the content display in the table or tabs).<br/>
    **This project has a all the necessary as described in the client -> products part and also in the admin -> order table.**

-------------------------------------------------------------------------------------------------------------------- <br/>

**Bonus on the client side:**

1. Logout:
   The application/site must be allowed to disconnect the user and not use the site/another app from 4 hours.<br/>
   **This project has a all the necessary as described and logs out after 1 hour.**

2. Limiting requests:
   The number of calls to the server that a user can make in 24 hours must be limited
   Protection of the server from an attack designed to slow down/destroy it.<br/>
   **I created this in the index.js in the sever side, using express-rate-limit**

3. User management interface:
   A user management page that will display the users registered in the database in a table on the site.
   On this page it will be possible to edit or delete users, it will also be possible to change the permissions user from normal user to admin.<br/>
   **I have a user managment page in the admin site,**
   **but for now i decided that the admin wont have an option to change the users data, because each user can edit his on info**

4. Management of orders/favorites:
   A page that will show the user the type of content admin according to the number of people they defined same as favorite.<br/>
   **i have order managment in the admin site - the admin controlls the orders status.**
   **Also i have in the BookManage part in the admin site, a filter for most favorite books and out of stock items.**

5. Inventory management:
   In the case of an online store, a store inventory management page.
   A certain product is out of stock from the inventory, an indication must be given to the client that the product is out of stock.<br/>
   **When a product is out of stock it will disapear from the products list, and it will add to the admins out of stock items list.**

6. User profile picture:
   User details with a profile picture that will be uploaded to a folder on the computer on which the project is located.<br/>
   **I didn't do this part. I found it unnecessary for my project.. But i have an upload pictures form in the admin side, so its kind of similar :)**

7. Password update:
   A page must be created that will allow a user who has forgotten his password to change his password,
   and this only after verifying that it is indeed a user trying to change his password and not a hacker.
   For that matter it is recommended to send an email to the user with a link to the password change page.<br/>
   **I've created this page using node mailer, and a password will be sent to his email with a one time token, and after clicking the link - the user will be routed to change password page.**
   **Now the email service is commented in the userRoutes because all my one time emails we're blocked after 24h and the failure of the login to the admin/sending mail does problems to the server, and this way its off right now. By undo the comment and inserting "admin" mail, the system will send a mail to the email the user wrote (if exists in the data base).**

-------------------------------------------------------------------------------------------------------------------- <br/>

**Server-side technology requirements**

1. package.json:
   In the json.package file, put nodemon in devDependencies, and let inside the "main" key be the name of the file to run the application.

2. Listening to HTTP requests:
   A rest API interface must be built that allows requests to be received, to create, edit,<br/>
   displaying and deleting information from the database according to client side requests.
   For this purpose the library must be used express.
   **This project has a all the necessary as described in this part.**

3. Authentication:
   The request must go through an authentication process in order to verify that the client is indeed the one who sent the request,
   and not a hacker trying to break into the database through the server.<br/>
   **To solve this problem I used AuthGuard for my routes, so that onky user with a token can get access to the specific data.**

4. Authorization:
   On the server side, only a user logged in and defined as admin should be allowed to add, delete or editing information from the database.<br/>
   **In the project, only the admin can delete and add content.**

5. Database:
   The information in the project must be saved in the MongoDB database either locally or on cloud.
   It is also necessary to allow adding, editing and deleting details from the database.
   In the folder you are in you must submit an env file if you saved the keys to connect with the cloud server in it.<br/>
   **My keys stored in the idex.js file in the server side, because i had problems with env files i didnt have time to resolve with the server.**

6. Server-side validations:
   Server-side validations must be done with the joi library or a similar library, and in the case of
   There are errors and stop the functions before sending the object to mongoos validation and saving
   in the database.<br/>
   **I've completed this part and you can find it attached to login route and joivalidation.js file in the server side and also view with the logger error 409 that i created.**
   **Quick check to see that its working is when you change from the data base the users correct email and then trying to reconnect, you will get error 409 I created.**

7. Models & Routes:
   The code must be divided into modules to keep the code clean and readable.
   **In this project, I tried to keep the code clear as much as possible.**

8. Logger:
   You must use a library for managing http requests such as Morgan or alternatively create a logger your own that will print in the console readings from the client side to the server side.
   **In the project I used logger-morgan, and its working very good and all is available in the Putty app.**

9. Comments:
   On the names of the variables and functions to be logical and tell a story about the code.
   If necessary concise notes for programmers should be added if there are complex functions or there is a page with multiples functions within it.
   **All the way working on the project, I tried to keep the names and the logic as readable and understandable as possible.**
