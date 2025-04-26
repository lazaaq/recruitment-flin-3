## Description :
The application simulates the integration between the Backend API and the frontend. The backend uses Express.js and the frontend uses vanilla javascript and HTML CSS. There are 2 backend endpoints, namely the POST method "/leads" and the GET method "/leads".
1. POST method "/leads" => To add leads data
2. GET method "/leads" => To get leads data

There are 3 pages on the frontend:
1. Login page. To view leads data, you can log in first using the username "admin" and password "password123"
2. View Leads page. After successfully logging in, you can view leads data in the view leads menu.
3. Submit Leads page. After successfully logging in, you can add leads data in the submit leads menu.

Leads data is stored in the leads.json file. To view this file, you can use a text editor.

## How to Install :
```bash
git clone https://github.com/lazaaq/recruitment-flin-3
cd recruitment-flin-3
npm install
npm run dev
```

## Test the Application according to the Question
1. Open http://localhost:3003/login.html in the browser
2. Log in using the username "admin" and password "password123"
3. Go to the view leads page to see all leads data
4. Go to the submit leads page to add leads data. There are Name, Phone, Email, and Loan Type.