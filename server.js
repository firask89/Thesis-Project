const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Schema = require("./database/Schema");
const dbOpt = require("./database/dbOpt");
const stripe = require("stripe")("sk_test_S3OtpMpuhIGF1KuyUMJaVtNN");
// const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/initializeDB", (req, res) => {
  console.log("testing initialize db");
  Schema.initializeDB(req, res);
});

app.use(express.static(path.join(__dirname, 'client/build')));


// Signup User
app.post("/account/signup", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  let email = req.body.email;
  const telephone = req.body.telephone;
  const password = req.body.password;

  if (!firstName) {
    return res.send({
      success: false,
      message: "Error: must fill in name field."
    });
  }
  if (!lastName) {
    return res.send({
      success: false,
      message: "Error: must fill in name field."
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: "Error: must fill in email field."
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: must fill in password field."
    });
  }
  if (!telephone) {
    return res.send({
      success: false,
      message: "Error: must fill in phone number field."
    });
  }
  email = email.toLowerCase();
  dbOpt.signUp(req, res);
});

// User sign in
app.post("/account/signin", (req, res, next) => {
  let email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.send({
      success: false,
      message: "Must fill in Email field"
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Must fill in Password field"
    });
  }
  email = email.toLowerCase();

  dbOpt.signIn(req, res);
});

// Post charities in DB
app.post("/addCharities", function(req, res) {
  dbOpt.addCharity(req, res);
});

app.post('/add_donation', function (req, res) {
  console.log(req.body,"/add_donation/add_donation/add_donation/add_donation/add_donation");
  
  dbOpt.addDonation(req, res)
});

// sum and update amount reveived;
app.post('/charities_sum', function (req, res) {
  dbOpt.DonationAmountSummed(req, res)
});

// Show the donations made by the user
app.post('/profile', function (req, res) {
  dbOpt.donationsMadeByUser(req, res)
});

// Donations made to specific Charity
app.post('/charities_don', function (req, res) {
  dbOpt.donationsToCharity(req, res)
});


// Get charities by user
app.post("/userCharities", function(req, res) {
  dbOpt.getUserChar(req, res);
});

// Get all charities
app.get('/charities', function (req, res) {
  // ORDER BY date DESC
  dbOpt.getAllChar(req, res);
});

//Update charities
app.put("/charities", function(req, res) {
  dbOpt.updateChar(req, res);
});

//Update usertype
app.put("/account/usertype", function(req, res) {
  dbOpt.updateRequestTypeAccept(req, res);
  console.log("req.body", req.body);
  dbOpt.updateUserType(req, res);
});

app.put("/updateRequestTypeDecline", function(req, res) {
  dbOpt.updateRequestTypeDecline(req, res);
//Delete charities
app.delete('/delCharities', function (req, res) {
  dbOpt.delChar(req, res)
})
});

//Delete charities
app.delete("/delCharities", function(req, res) {
  dbOpt.delChar(req, res);
});

//Add Donation
app.post("/addDonation", function(req, res) {
  dbOpt.addDonation(req, res);
});

//Total of donation for specific charity
app.post("/totalDonation", function(req, res) {
  dbOpt.sumDonationByCharId(req, res);
});

//Update user information
app.put('/editUserInfo', function (req, res) {
  dbOpt.editUserInfo(req, res)
});

//JWT decode token
app.post('/decodeToken', function (req, res) {
  dbOpt.decodeJwt(req, res)
});

// Get all the organizations
app.get('/userOrganizations', function (req, res) {
  dbOpt.userOrganizations(req, res)
});

// Upgrade usertype to organization
app.post('/becomeOganization', function (req, res) {
  dbOpt.becomeOrganization(req, res)
});
//get charities id
app.post('/creditcard', function (req, res) {
  dbOpt.getCharityId(req, res)
});

// Show requests to upgrade user to organization
app.get('/getRequests', function (req, res) {
  dbOpt.getRequests(req, res)
});

// Show user profile information
app.get('/getUserInfoID', function (req, res) {
  dbOpt.getUserInfoID(req.query.userId, res)
});

//Update request type to decline
// app.put('/updateRequestTypeDecline',function(req, res) {
//   dbOpt.updateRequestTypeDecline(req, res)
// });
module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));
