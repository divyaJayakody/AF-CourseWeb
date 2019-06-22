//====================================================================================
const collection_assignments=[


    {
    "_id" : ObjectId("5d0a89dbe425ff5bf8d3e04f"),
    "assign_id" : "004",
    "assign_name" : "LAB01",
    "assign_upload" : "labEx01.pdf",
    "assign_course" : "AF",
    "assign_dueDate" : "28/07/19",
    "__v" : 0
  },
    {
        "_id" : ObjectId("5d0a8a32e425ff5bf8d3e050"),
        "assign_id" : "005",
        "assign_name" : "LAB02",
        "assign_upload" : "LabEx02.pdf",
        "assign_course" : "AF",
        "assign_dueDate" : "25/07/19",
        "__v" : 0
    },
    {
        "_id" : ObjectId("5d0b0e9177cdd74a84843516"),
        "assign_id" : "006",
        "assign_name" : "LAB03",
        "assign_upload" : "LabEx03.pdf",
        "assign_course" : "AF",
        "assign_dueDate" : "26/07/2019",
        "__v" : 0
    },
    {
        "_id" : ObjectId("5d0bf8369280cb5fe4c3cd4a"),
        "assign_id" : "007",
        "assign_name" : "LAB04",
        "assign_upload" : "LabEx04.pdf",
        "assign_course" : "DS",
        "assign_dueDate" : "25/07/2019",
        "__v" : 0
    },
    {
        "_id" : ObjectId("5d0cc519593a1f65ac12419e"),
        "assign_id" : "007",
        "assign_name" : "LAB05",
        "assign_upload" : "LabEx05.pdf",
        "assign_course" : "AF",
        "assign_dueDate" : "27/07/2019",
        "__v" : 0
    }
    ];
//====================================================================================

const collection_courses=[
    {
    "_id" : ObjectId("5d0bf2b440e2acf81ee76717"),
    "code" : "010",
    "name" : "TAF",
    "semester" : "1st ,2019",
    "incharge" : "Divya",
    "credits" : "6"
    },
    {
        "_id" : ObjectId("5d0bf2ea40e2acf81ee7673e"),
        "code" : "011",
        "name" : "VAF",
        "semester" : "1st ,2019",
        "incharge" : "Samadhi",
        "credits" : "6"
    }
    ];
//====================================================================================
const collection_exams = [
    {
        "_id" : ObjectId("5d097f84d7f11294d147c074"),
        "exam_id" : "01",
        "exam_name" : "online-exam",
        "exam_upload" : "somefile.pdf",
        "exam_course" : "AF",
        "exam_dueDate" : "23/06/19"
    },
    {
        "_id" : ObjectId("5d097f84d7f11294d147c075"),
        "exam_id" : "02",
        "exam_name" : "lab-online-exam",
        "exam_upload" : "somefile.pdf",
        "exam_course" : "AF",
        "exam_dueDate" : "22/06/19"
    },
    {
        "_id" : ObjectId("5d097f84d7f11294d147c076"),
        "exam_id" : "03",
        "exam_name" : "mid-semester-exam",
        "exam_upload" : "somefile.pdf",
        "exam_course" : "AF",
        "exam_dueDate" : "23/06/19"
    }
,{
        "_id" : ObjectId("5d097f84d7f11294d147c078"),
        "exam_id" : "05",
        "exam_name" : "final-exam",
        "exam_upload" : "somefile.pdf",
        "exam_course" : "AF",
        "exam_dueDate" : "26/06/19"
    }
    ,{
        "_id" : ObjectId("5d0a8ee4e425ff5bf8d3e051"),
        "exam_id" : "06",
        "exam_name" : "final-project",
        "exam_upload" : "final-project.pdf",
        "exam_course" : "AF",
        "exam_dueDate" : "30/06/19",
        "__v" : 0
    }
];

//====================================================================================
const collection_marks= [

    {
        "_id" : ObjectId("5d0cc059593a1f65ac12419c"),
        "student_itno" : "IT17156136",
        "student_course" : "AF",
        "student_assign" : "final-exam",
        "student_marks" : "78",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cca1f593a1f65ac1241a1"),
        "student_itno" : "IT17156134",
        "student_course" : "AF",
        "student_assign" : "LAB01",
        "student_marks" : "74",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0da010c4d8f573245e3c67"),
        "student_itno" : "IT17156135",
        "student_course" : "AF",
        "student_assign" : "final-project",
        "student_marks" : "65",
        "__v" : 0
    }
];
//====================================================================================
const collection_notifications= [

    {
        "_id" : ObjectId("5d0cc059593a1f65ac12419d"),
        "receiver_id" : "IT17156136",
        "date" : "6/21/2019 5:02:40 PM",
        "message" : "Your Submission for AF,final-exam  scored 78 !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc519593a1f65ac12419f"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 5:22:56 PM",
        "message" : "The assignment LAB05 of Course AF has been uploaded,Upload you answers before 26/07/2019",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc939593a1f65ac1241a0"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 5:40:32 PM",
        "message" : "The deadline for  AF , LAB01  has been extended to undefined !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cca1f593a1f65ac1241a2"),
        "receiver_id" : "IT17156134",
        "date" : "6/21/2019 5:44:22 PM",
        "message" : "Your Submission for AF,LAB01  scored 74 !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cfc9c24fd744f5c7dd8e3"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 9:19:47 PM",
        "message" : "The deadline for  AF , LAB01  has been extended to undefined !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cfce824fd744f5c7dd8e4"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 9:21:04 PM",
        "message" : "The deadline for  AF , LAB03  has been extended to undefined !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0d022224fd744f5c7dd8e5"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 9:43:22 PM",
        "message" : "The deadline for  AF , LAB02  has been extended to undefined !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0d037b24fd744f5c7dd8e6"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 9:49:07 PM",
        "message" : "The deadline for  AF , LAB05  has been extended to undefined !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0d039624fd744f5c7dd8e7"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 9:49:33 PM",
        "message" : "The deadline for  AF , LAB05  has been extended to undefined !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0d039e24fd744f5c7dd8e8"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 9:49:42 PM",
        "message" : "The deadline for  AF , LAB05  has been extended to undefined !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0d03a224fd744f5c7dd8e9"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 9:49:46 PM",
        "message" : "The deadline for  AF , LAB05  has been extended to undefined !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0d03bf24fd744f5c7dd8ea"),
        "receiver_id" : "Special-Notice",
        "date" : "6/21/2019 9:50:15 PM",
        "message" : "The deadline for  AF , LAB05  has been extended to undefined !",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0d6243947d5167887f9ae6"),
        "receiver_id" : "Special-Notice",
        "date" : "6/22/2019 4:33:31 AM",
        "message" : "The deadline for  AF , LAB03  has been extended to undefined !",
        "__v" : 0
    }

];

//====================================================================================
const collection_submissions= [
    {
        "_id" : ObjectId("5d09847bd7f11294d147c40c"),
        "sub_stud_itno" : "IT17156134",
        "sub_up_date" : "19/06/19",
        "sub_course" : "AF",
        "sub_assign" : "LAB01",
        "sub_file" : "IT17156134.zip"
    },{
        "_id" : ObjectId("5d098488d7f11294d147c418"),
        "sub_stud_itno" : "IT17156135",
        "sub_up_date" : "19/06/19",
        "sub_course" : "AF",
        "sub_assign" : "LAB01",
        "sub_file" : "IT17156135.zip"
    }, {
        "_id" : ObjectId("5d098496d7f11294d147c428"),
        "sub_stud_itno" : "IT17156136",
        "sub_up_date" : "19/06/19",
        "sub_course" : "AF",
        "sub_assign" : "LAB02",
        "sub_file" : "IT17156136.zip"
    },{
        "_id" : ObjectId("5d0984a2d7f11294d147c431"),
        "sub_stud_itno" : "IT17156137",
        "sub_up_date" : "19/06/19",
        "sub_course" : "AF",
        "sub_assign" : "LAB02",
        "sub_file" : "IT17156137.zip"
    },{
        "_id" : ObjectId("5d0984bad7f11294d147c45b"),
        "sub_stud_itno" : "IT17156138",
        "sub_up_date" : "19/06/19",
        "sub_course" : "LAB03",
        "sub_assign" : "final-exam",
        "sub_file" : "IT17156138.zip"
    },{
        "_id" : ObjectId("5d0ab322ef1dff5b98a96a85"),
        "sub_stud_itno" : "IT17156135",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "LAB03",
        "sub_file" : "IT17156135.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0bb6c590685805ec39ddd2"),
        "sub_stud_itno" : "IT15156138",
        "sub_up_date" : "6/20/2019 10:09:33 PM",
        "sub_course" : "AF",
        "sub_assign" : "LAB04",
        "sub_file" : "online-exam-03.pdf",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cacda40e2acf81ee7c71b"),
        "sub_stud_itno" : "IT17156138",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "LAB04",
        "sub_file" : "IT17156135.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc7bf40e2acf81ee7e121"),
        "sub_stud_itno" : "IT17156138",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "LAB05",
        "sub_file" : "IT17156135.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc7d240e2acf81ee7e128"),
        "sub_stud_itno" : "IT17156137",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "LAB05",
        "sub_file" : "IT17156137.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc80c40e2acf81ee7e17d"),
        "sub_stud_itno" : "IT17156134",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "online-exam",
        "sub_file" : "IT17156134.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc81d40e2acf81ee7e1ba"),
        "sub_stud_itno" : "IT17156135",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "online-exam",
        "sub_file" : "IT17156135.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc84c40e2acf81ee7e1d4"),
        "sub_stud_itno" : "IT17156135",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "lab-online-exam",
        "sub_file" : "IT17156135.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc85840e2acf81ee7e20e"),
        "sub_stud_itno" : "IT17156136",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "lab-online-exam",
        "sub_file" : "IT17156136.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc87940e2acf81ee7e221"),
        "sub_stud_itno" : "IT17156134",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "mid-semester-exam",
        "sub_file" : "IT17156134.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc88440e2acf81ee7e226"),
        "sub_stud_itno" : "IT17156135",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "mid-semester-exam",
        "sub_file" : "IT17156135.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc89a40e2acf81ee7e268"),
        "sub_stud_itno" : "IT17156134",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "final-exam",
        "sub_file" : "IT17156134.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc8e240e2acf81ee7e2bf"),
        "sub_stud_itno" : "IT17156135",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "final-exam",
        "sub_file" : "IT17156135.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc8fc40e2acf81ee7e2d2"),
        "sub_stud_itno" : "IT17156134",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "final-project",
        "sub_file" : "IT17156134.zip",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0cc91140e2acf81ee7e314"),
        "sub_stud_itno" : "IT17156135",
        "sub_up_date" : "21/06/2019",
        "sub_course" : "AF",
        "sub_assign" : "final-project",
        "sub_file" : "IT17156135.zip",
        "__v" : 0
    }];


//====================================================================================
const collection_tcourses= [
    {
        "_id" : ObjectId("5d0bee8c8fcdc267d80ab3da"),
        "tcourse_code" : "005",
        "tcourse_name" : "AF",
        "tcourse_semester" : "1st ,2019",
        "tcourse_instructor" : "Divya",
        "tcourse_credits" : "6",
        "tcourse_approved_Date" : "6/21/2019 2:07:31 AM",
        "__v" : 0
    },
    {
        "_id" : ObjectId("5d0bef0c8fcdc267d80ab3dc"),
        "tcourse_code" : "006",
        "tcourse_name" : "DS",
        "tcourse_semester" : "1st ,2019",
        "tcourse_instructor" : "Samadhi",
        "tcourse_credits" : "6",
        "tcourse_approved_Date" : "6/21/2019 2:09:40 AM",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0bf14efdefa066200a33b7"),
        "tcourse_code" : "007",
        "tcourse_name" : "SEPQM",
        "tcourse_semester" : "1st ,2019",
        "tcourse_instructor" : "Wendy",
        "tcourse_credits" : "6",
        "tcourse_approved_Date" : "6/21/2019 2:19:17 AM",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0bf3a6fdefa066200a33b9"),
        "tcourse_code" : "008",
        "tcourse_name" : "SA",
        "tcourse_semester" : "1st ,2019",
        "tcourse_instructor" : "Yasiru",
        "tcourse_credits" : "6",
        "tcourse_approved_Date" : "6/21/2019 2:29:17 AM",
        "__v" : 0
    },{
        "_id" : ObjectId("5d0c0c66cea06e5e9c3cac43"),
        "tcourse_code" : "009",
        "tcourse_name" : "SAF",
        "tcourse_semester" : "1st ,2019",
        "tcourse_instructor" : "Divya",
        "tcourse_credits" : "6",
        "tcourse_approved_Date" : "6/21/2019 4:14:53 AM",
        "__v" : 0
    }];