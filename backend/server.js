
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


//file upload part
const path = require('path');
const multer  = require('multer');//handle multipart encoded data
const GridFsStorage = require('multer-gridfs-storage');//storage engine for mutler toupload file directly into the db
const Grid = require('gridfs-stream');//handle chuncking of data,also to view files
const methodOverride = require('method-override');

//Router initiation
const TCourseRoutes = express.Router();
const AssignRoutes = express.Router();
const ExamRoutes = express.Router();
const MarksRoutes = express.Router();
const courseRoutes = express.Router();
const SubmissionRoutes = express.Router();
const NotificationRoutes = express.Router();
const FileRoutes = express.Router();


//initialize models
const TCourse = require('./models/tcourse.model');
const Assignment = require('./models/assignment.model');
const Exam = require('./models/exam.model');
const course = require('./models/p_courses.model');
const Marks = require('./models/marks.model');
const Submission = require('./models/submissions.model');
const Notification = require('./models/notifications.model');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.set('view engine','ejs');


//=============================================================================
// DB CONFIG
//=============================================================================

mongoose.connect('mongodb://127.0.0.1:27017/coursweb)',{useNewUrlParser:true}).then(() => {
    console.log('Connected to the DB');
}).catch(err => {
    console.error(err);
    process.exit(-1);
});


//=============================================================================
// FILE STORAGE - CONNECTION & C-R-U-D
//=============================================================================

//for file storage purpose, a seperate connection is used
const mongoURI ='mongodb://mongodb://127.0.0.1:27017/coursweb)';
const conn = mongoose.createConnection(mongoURI);
let gfs;//will handle connection of grid to mongodb

conn.once('open',()=>{
    //initialize stream
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
});

//create storage engine
const storage = new GridFsStorage({
   url:mongoURI,
   file:(req,file)=>{
       return new Promise((resolve,reject)=>{
         const filename =file.originalname;
         const fileInfo = {
             filename:filename,
             bucketName:'uploads' //collection name 'uploads'
         };
         resolve(fileInfo);
       });
   }
});

const upload = multer({storage});//called when user upload something

app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/');
});

app.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.render('index', { files: false });
        } else {
            files.map(file => {
                if (
                    file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png'
                ) {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            res.render('index', { files: files });
        }
    });
});


app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // If File exists this will get executed
        const readstream = gfs.createReadStream(file.filename);
        return readstream.pipe(res);
    });
});




app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if the input is a valid image or not
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // If the file exists then check whether it is an image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

// delete function to remove the file from the database
app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }

        res.redirect('/');
    });
});

/*
FileRoutes.get('/:filename', (req, res) => {
    gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
        if(!files || files.length === 0){
            return res.status(404).json({
                message: "Could not find file"
            });
        }

        const readstream = gfs.createReadStream({
            filename: files[0].filename
        });
        res.set('Content-Type', files[0].contentType);
        return readstream.pipe(res);
    });
});

FileRoutes.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if(!files || files.length === 0){
            return res.status(404).json({
                message: "Could not find files"
            });
        }
        return res.json(files);
    });
});

FileRoutes.post('/', singleUpload, (req, res) => {
    if (req.file) {
        return res.json({
            success: true,
            file: req.file,
            x:"hj"

        });
    }
    res.send({ success: false });
});

FileRoutes.delete('/:filename', (req, res) => {
    gfs.remove({ filename: req.params.filename }, (err) => {
        if (err) return res.status(500).json({ success: false })
        return res.json({ success: true });
    })
});

*/

//=============================================================================
// COURSE - GET COURSE LIST
//=============================================================================


/* GET all courses assigned. */
/*
TCourseRoutes.route('/').get(function (req,res) {

    TCourse.find(function(err,courses){
        if(err){
            console.log(err);
        }else{
            res.json(courses)
        }

    });
});
*/
TCourseRoutes.route('/').get(function (req,res) {
    let param = req.query.rcourse_instructor;
    TCourse.find({tcourse_instructor:param}).exec(function(err,courses){
        if(err){
            console.log(err);
        }else{
            res.json(courses)
        }

    });
});



/* new  course. */
TCourseRoutes.route('/add').post(function(req,res){
    let course = new TCourse(req.body);
    course.save().then(courseSaved=>{

        res.status(200).json(courseSaved);
    })
        .catch(err=>{
            res.status(400).send('adding the course failed');
        });

});

//=============================================================================
// PENDING COURSE - GET COURSE LIST
//=============================================================================

/* GET all pending courses by instructor id. */
courseRoutes.route('/').get(function (req,res) {
    let param = req.query.rcourse_instructor;
    course.find({incharge:param}).exec(function(err,courses){
        if(err){
            console.log(err);
        }else{
            res.json(courses)
        }

    });
});


TCourseRoutes.route('/').get(function (req,res) {
    let param = req.query.rcourse_instructor
    TCourse.find({tcourse_instructor:param}).exec(function(err,courses){
        if(err){
            console.log(err);
        }else{
            res.json(courses)
        }

    });
});

/* once confirmed pending course is deleted from temporary db. */
courseRoutes.route('/remove/:id').delete(function (req,res) {

    course.findOneAndDelete({_id:req.params.id},function(err,res){
        if(err){
            console.log(err);
        }
        res.status(200);

    });
});
/*{
    "_id" : ObjectId("5d0b005940e2acf81ee6e82d"),
    "course_id" : "034",
    "course_name" : "GAF",
    "course_instructor" : "",
    "course_approved_Date" : ""
}*/

//=============================================================================
// ASSIGNMENTS - CREATE , GET , UPDATE ASSIGNMENTS LIST
//=============================================================================


/* GET all assignments. */
AssignRoutes.route('/').get(function (req,res) {
    let param = req.query.rcourse_name;
    Assignment.find({assign_course:param}).exec(function(err,assignments){
        if(err){
            console.log(err);
        }else{
            res.json(assignments)
        }

    });
});
/* get assignment by id. */
AssignRoutes.route('/:id').get(function (req,res) {
    Assignment.findById(req.params.id,function(err,assignments){
        if(err){
            console.log(err);
        }else{
            res.json(assignments)
        }

    });
});




/* new  assignment. */
AssignRoutes.route('/add').post(function(req,res){
    let assign = new Assignment(req.body);
    assign.save().then(assign=>{

        res.status(200).json({'Assignment':'Assignment added succesfully'});
    })
        .catch(err=>{
            res.status(400).send('adding the assignment failed');
        });

});

//update assignment by id
AssignRoutes.route('/update/:id').post(function (req,res) {
    console.log(req.body.assign_name);
    Assignment.findById(req.params.id,function(err,assign){
        if(!assign){
            res.status(404).send("Data is not found");
        }else{
            assign.assign_name=req.body.assign_name;
            assign.assign_upload=req.body.assign_upload;
            assign.assign_course=req.body.assign_course;
            //checking the updated day is after the original due date
            if(assign.assign_dueDate < req.body.assign_dueDate) {
                assign.assign_dueDate = req.body.assign_dueDate;

                assign.save().then(assign=>{
                    res.status(200).json('Assignment updated!');
                })
                    .catch(err =>{
                        res.status(400).send("Updating failed");
                    });
            }else{
                console.log('Date is earlier than original date');
                res.status(401).send("Updating failed,please assign a date later than original date");
            }

        }

    });
});

//=============================================================================
// EXAM - CREATE , GET , UPDATE EXAM LIST
//=============================================================================
/* GET all exams. */



ExamRoutes.route('/').get(function (req,res) {
    let param = req.query.rcourse_name;
    Exam.find({exam_course:param}).exec(function(err,exams){
        if(err){
            console.log(err);
        }else{
            res.json(exams)
        }

    });
});

/* get exam by id. */
ExamRoutes.route('/:id').get(function (req,res) {
    console.log(req.params.id);
    Exam.findById(req.params.id,function(err,exams){
        if(err){
            console.log(err);
        }else{
            res.json(exams)
        }

    });
});

ExamRoutes.route('/add').post(function(req,res){
    let exam = new Exam(req.body);
    exam.save().then(exam=>{

        res.status(200).json({'Exam':'Exam added succesfully'});
    })
        .catch(err=>{
            res.status(400).send('adding the Exam failed');
        });

});

ExamRoutes.route('/update/:id').post(function (req,res) {
    console.log(req.body.exam_name);
    Exam.findById(req.params.id,function(err,exam){
        if(!exam){
            res.status(404).send("Data is not found");
        }else{
            exam.exam_name=req.body.exam_name;
            exam.exam_upload=req.body.exam_upload;
            exam.exam_course=req.body.exam_course;
            //checking the updated day is after the original due date
            if(exam.exam_dueDate < req.body.exam_dueDate) {
                exam.exam_dueDate = req.body.exam_dueDate;

                exam.save().then(exam=>{
                    res.status(200).json('Exam updated!');
                })
                    .catch(err =>{
                        res.status(400).send("Updating failed");
                    });
            }else{
                console.log('Date is earlier than original date');
                res.status(400).send("Updating failed,please exam a date later than original date");
            }

        }

    });
});

//=============================================================================
// SUBMISSIONS- GET  SUBMISSIONS LIST
//=============================================================================

/* GET all submissions . */
SubmissionRoutes.route('/').get(function (req,res) {

    let course = req.query.rcourse_name;
    let assign = req.query.rassign_name;
    let exam = req.query.rexam_name;

    if(typeof assign !== "undefined" && typeof course !== "undefined" ){
        console.log(course+" "+assign);
        Submission.find({$and:[{sub_course:course},{sub_assign:assign}]}).exec(function(err,submission){
            if(err){
                console.log(err);
            }else{
                res.json(submission)
            }

        });
    }else if(typeof exam !== "undefined" && typeof course !== "undefined"){
        console.log(course+" "+exam);
        Submission.find({$and:[{sub_course:course},{sub_assign:exam}]}).exec(function(err,submission){
            if(err){
                console.log(err);
            }else{
                res.json(submission)
            }

        });
    }else{
        console.log("Error,having both assignemnt "+assign+",exam together is not allowed  box" +
            ""+exam)
    }

});


/* GET all submissions under course and assignment name. */
SubmissionRoutes.route('/:sub_course/:sub_assign').get(function (req,res) {
    Submission.find({sub_course:req.params.sub_course,sub_assign:req.params.sub_assign},function(err,submission){
        if(err){
            console.log(err);
        }else{
            res.json(submission)
        }

    });
});

SubmissionRoutes.route('/add').post(function(req,res){
    let sub = new Submission(req.body);
    sub.save().then(submission=>{

        res.status(200).json(submission);
    })
        .catch(err=>{
            res.status(400).send('adding the submission failed');
        });

});


//=============================================================================
// MARKS - CREATE MARKS LIST
//=============================================================================


/* POST marks . */
MarksRoutes.route('/add').post(function (req,res) {

    let mark = new Marks(req.body);
    mark.save().then(mark=>{
        res.status(200).json({'marks':'marks added succesfully'});
    })
        .catch(err=>{
            res.status(400).send('adding marks failed');
        });

});


/* GET all marks . */
MarksRoutes.route('/').get(function (req,res) {
    Marks.find(function(err,marks){
        if(err){
            console.log(err);
        }else{
            res.json(marks)
        }

    });
});

//=============================================================================
// NOTIFICATIONS - send notifications
//=============================================================================


/* POST notifications . */
NotificationRoutes.route('/add').post(function (req,res) {

    let note = new Notification(req.body);
    note.save().then(note=>{
        res.status(200).json(note);
    })
        .catch(err=>{
            res.status(400).send('sending the notification failed');
        });

});

/* GET all notifications . */
NotificationRoutes.route('/').get(function (req,res) {
    Notification.find({}).sort('-date').exec(function(err,notes){
        if(err){
            console.log(err);
        }else{
            res.json(notes)
        }

    });
});

//=============================================================================
//SERVER CONFIG
//=============================================================================

app.listen(3002, err => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Application is running on port 3002');
});


app.use('/courses',TCourseRoutes);
app.use('/assignments',AssignRoutes);
app.use('/exams',ExamRoutes);
app.use('/marks',MarksRoutes);
app.use('/pending',courseRoutes);
app.use('/submissions',SubmissionRoutes);
app.use('/notifications',NotificationRoutes);
app.use('/files',FileRoutes);

module.exports = app;
