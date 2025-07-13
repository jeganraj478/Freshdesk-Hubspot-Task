# Freshdesk-Hubspot-Task

Tech stack : React ,Express js,Mongodb,Node js

Setup Instructions
-Clone the respository
Install dependencies

Sample .env file for react - frontend 
VITE_API_BASE_URL="backend url"

Sample .env file for node js -backend
ALLOWED_URL="frontend url"
MONGODB_URI='mongodb url'
JWT_SECRET='jwt key'



Webhook Configuration (Freshdesk)
To receive real-time ticket updates in your app, set up a webhook in Freshdesk:

Steps:
Go to Admin > Automation > Ticket Updates > New Rule
Add a condition:
    Event: "Ticket is created" (or any desired trigger)
    In Actions, choose Trigger Webhook:
    Method: POST
    URL: https://your-backend-url.com/api/webhook/freshdesk
    Content type: application/json
    {
       "type": "ticket.created",
       "ticket": {
       "id": "{{ticket.id}}",
       "subject": "{{ticket.subject}}",
       "description": "{{ticket.description}}",
       "status": "{{ticket.status}}",
       "priority": "{{ticket.priority}}",
       "email": "{{ticket.requester.email}}"
       }
    }
    Save the rule and test it by creating a new ticket.


Sample user credentials
test@gmail.com
Test@123

