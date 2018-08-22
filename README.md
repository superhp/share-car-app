The purpose of this app is to allow workers of company Cognizant to share their vehicle with co-workers on their way to work,
because right now offices don't have enough parking space for everyone and amount of people traveling to work with car must be reduced.
Each time person picks up a co-workers on his way to/from work, he receives a point in order to know, who was the most generous driver.

App was developed during an internship at company Cognizant by team of four interns in approximately 2.5 weeks.

User manual

In order to run this app you need to have Visual studio, Node.js, SQl server, 2 Facebook accounts(explained at the very end of readme)

Back-end is started by compiling ShareCar.Api project in Visual studio.
Front-end is launched with go to ShareCar.Client folder and run "npm start" command in CMD (or code editors console). Before launching front-end run 
"npm i" command in order to download packages which are used in in this project.

In order to use app user must connect using his FB account, then he has to choose his role:
Driver (user wants to drive his co-workers to work with his own car)
Passenger (user wants to be driven to work by other people)

If user chooses to be a driver:

on the bottom menu he has four options:

Change role: returns user to role selection window.

Routes map: here user can creates his "Rides"(something like a facebook event, each ride has a date,time and route, passenger will be able to request
 a seat in car of driver for selected rides). Firstly user will see a map where he can create his route to/from work. He can do it by clicking start
 and destinations points  on a map, typing an address (in this case he must choose suggested address) or selecting an office as a start/destination point. 
 Once there is start and destination point, program will create and display on a map fastest route between these two point. After that user has to click 
 "continue button which will redirect him to new page, where he has to mark days and time when he will travel by this route. Then user has to click 
 "Create Rides" button in order to complete creation of rides.
 P.S.one of route points must be office of Cognizant(a requirement which we were given). Even though user is not yet forced to choose office as one of his 
 route points when creating rides, people who want to request ride won't be able to see it, because they are shown only routes where office is start or 
 destination point.

 Rides: a place where user can view rides he has created. By clicking "View" user can see requests of other people who want to be passengers for selected ride.
 Each request can be accepted or denied. Once request is accepted person who made it will be marked as passenger of a ride. Each request which user hasn't 
 seen yet is marked. Also user can view a point on a map, where passenger wants to be picked up from.
 
 Profile: this component is independent from user's selected role. Here user can modify his first and last name, add some additional info about himself,
 view amount of people who have traveled to/from office with him this month.
 
 If user chooses to be a passenger:
 
 Routes map: here user can view existing routes created by drivers and request a seat in rides. By default he is show routes to Savanoriu 16 office, but he can change filtering criteria
 with "from office" "to office" buttons and "Select office" drop down menu. If there are any routes which satisfies user's filtering criteria they are
 displayed on a map. By clicking "Next route" "Previous route" user can select routes. When route is selected, names of drivers who have rides through 
 this route will be displayed on the screen. By clicking "view times" next to a drivers name, user can view date and time of each ride which he can request.
 
 Requests: here user can view status of his requests. There are four possible statuses: Waiting - driver hasn't responded yet, Accepted - driver has accepted you 
 as a passenger to requested ride, Denied - your request was denied, Deleted - ride which you requested was deleted. Each time status of request changes on time it 
 will be displayed above others with keyword "NEW".
 
 Why you need two faecbook accounts ? 
 
In order to fully test an application you need two facebook accoutns because rides which you create as a driver won't be visible to you when you change role to passenger(since
it wouldn't make sense to request a seat in a ride which you created).
If you have two facebook accounts you can login with second one in an incognito window(it has separate session) and then you are good to go !