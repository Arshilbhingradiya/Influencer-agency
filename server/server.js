require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authrouter = require("./router/auth-router");
const contactrouter = require("./router/contact-router");
const servicerouter = require("./router/service-router");
const adminrouter = require("./router/admin-router");
const userrouter = require("./router/userinfo-router.js");
const companyrouter = require("./router/company-router");
// const influrouter = require("./router/influencer-router.js");
const campaignRoutes=require("./router/campaignRoutes");
const connectdb = require("./db");
const influencerRoutes =require("./router/influencerRoutes");

// cors

const corsoption = {
  origin: "http://localhost:5173",
  method: "GET,POST,DELETE,PUT,PATCH",
  credentials: true,
};

// middleware all thingd a in all crud operation
app.use(cors(corsoption));

//middleware
app.use(express.json());

app.use("/api/auth", authrouter);
app.use("/api/form", contactrouter);
app.use("/api/data", servicerouter);
// admin panel
app.use("/api/admin", adminrouter);

// user panel

app.use("/api/user", userrouter);

// company panel
app.use("/api/campaigns", campaignRoutes);
app.use("/api/company", companyrouter);
// app.use("/api/influencer", influrouter);
app.use("/api/influencer", influencerRoutes);
// app.use("/api/idata", irouter);

// app.use("/api/form", router);
// we can use this method also but mvc structure is not prefer
// app.get('/', (req,res)=>{
//     res.status(200).send("hello world");
// })

connectdb();

app.listen(3000, () => {
  console.log(`server is running on 3000`);
});
