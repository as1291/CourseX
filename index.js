const e = require("express");
const cors = require('cors');
const express = require("express");
const jwt = require("jsonwebtoken");
const { emitKeypressEvents } = require("readline");
const app = express();

app.use(cors({
  origin: '*', // Allow requests from any origin. Adjust for security.
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,auth'
}));

app.use(express.json());

let ADMIN = [];
let USER = [];
let COURSES = [];

const secretKey = "superSECRET";

const generateJwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const authJwt = (req, res, next) => {
  const authHeader = req.headers.auth;

  if (authHeader) {
    const token = authHeader;

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(400);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(400).send("invalid user");
  }
};

//admin routes
app.post("/admin/signup", (req, res) => {
  //admin signup route
  const admin = req.body;
  const existingAdmin = ADMIN.find((a) => a.username === admin.username);
  if (existingAdmin) {
    res.status(400).send("admin aleady exists");
  } else {
    ADMIN.push(admin);
    const token = generateJwt(admin);
    res.status(200).json({ messge: "admin created successfully", token });
  }
});

//admin login route
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  const admin = ADMIN.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    const token = generateJwt(admin);
    res.status(200).json({ messgae: "logged in sucessfully ", token });
  } else {
    res.status(400).json({ message: "admin authntication failed" });
  }
});

//admin courses
app.post("/admin/courses", authJwt, (req, res) => {
  const course = req.body;
  course.id = COURSES.length + 1;
  COURSES.push(course);
  res.json({ message: "course added successfully", courseId: course.id });
});

//update courses
app.put("/admin/courses/:courseId", authJwt, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const courseIndex = COURSES.findIndex(a=>a.id===courseId);
  
  if (courseId > -1) {
    const updatedCourse = {...COURSES[courseIndex],...req.body};
    COURSES[courseIndex]=updatedCourse;
    res.json({message:'courses updated successfully'});
  }else{
    res.status(404).json({message:'invalid entry'});
  }
});

//admin get list of courses
app.get("/admin/courses", authJwt, (req, res) => {
  res.json({ courses: COURSES });
});

//user routes
//user signup
app.post('/user/signup',(req,res)=>{
  const user=req.body;
  const existingUser=USER.find(a=>a.username===user.username);
  if (existingUser) {
    res.status(404).json({message:'user already exists',token});
  }else{
    USER.push(user);
    const token = generateJwt(user);
    res.status(200).json({message:'user registered'});
  }
});

//user login
app.post('/user/login',(req,res)=>{
  const user = req.body;
  const usercheck = USER.find(u=>u.username===user.username && u.password===user.password);
  if (usercheck) {
    const token = generateJwt(user);
    res.status(200).json({message:'login successful', token});
  }else{
    res.status(404).json({message:'login failed'});
  }
});

//user course list
app.get('/user/courses',authJwt,(req,res)=>{
  res.status(200).json({courses:COURSES});
});


//user course purchase
app.get('/user/courses/:courseId',authJwt,(req,res)=>{
  const course = parseInt(req.params.courseId);
  const findCourse = COURSES.find(c=>c.id===course);
  if (findCourse) {
    const user = USER.find(u=>u.username===req.body.username);
    if(user){
      if (!user.purchasedCourses) {
        user.purchasedCourses=[];
      }
      user.purchasedCourses.push(findCourse);
      fs.writeFileSync('user.json',JSON.stringify(USER));
      res.status(200).json({message:'course purchased !'});
    }else{
      res.status(403).json({message:'user does not exists'});
    }
  }else{
    res.status(403).json({message:'course does not exists'});
  }
});

//user purchased courses
app.get('user/courses/purchased',authJwt,(req,res)=>{
  const user = USER.find(u=>u.username===req.user.username);
  if (user) {
    res.status(200),json({purchasedCourses:user.purchasedCourses});
  }else{
    res.status(403).json({message:'user not found'});
  }
})

//port address
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
