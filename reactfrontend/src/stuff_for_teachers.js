app.get("/studentsubmissions/:examid",(req,res)=>{
    const examID = req.params.examid;
    var studentIDsforExam = [];
    Submission.find({exam_id: examID},function(err,submissions){
        if(err){
            console.log(err);
        }
        else{
            submissions.forEach(function(submission,index){
                studentIDsforExam.push(submission.student_id);
            });
            res.send(studentIDsforExam);
        }
    });
});

const examID = "";
const studentID = "";
const score = "";
const feedback = {}


React.useEffect(() => {
    async function getData(url) {
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

      getData(`http://localhost:5000/studentsubmissions/${examID}/`)
        .then(data => {
            console.log(data);
        });
    }, []); 

app.get("/singlestudentsubmission/:studentid/:examid",(req,res)=>{
    const examID = req.params.examid;
    const studentID = req.params.studentid;
    Submission.findOne({exam_id: examID,student_id:studentID},function(err,submission){
        if(err){
            console.log(err);
        }
        else{
            res.send(submission);
        }
    });
});

React.useEffect(() => {
    async function getData(url) {
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

      getData(`http://localhost:5000/singlestudentsubmission/${studentID}/${examID}/`)
        .then(data => {
            console.log(data);
        });
    }, []); 


    app.post("/updatestudentsubmission/", (req,res)=>{
        const examID = req.body.examid;
        const studentID = req.body.studentid;
        const score = req.body.score;
        const feedback = req.body.feedback;
        Submission.updateOne({exam_id: examID,student_id:studentID},{score:score,feedback:feedback}, function(err){
            if(err){
                console.log(err);
            }
            else{
                res.send({response:"All good!"});
            }
        });
    });

    function submitFeedback(){
        async function postData(url) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({examid:examID,score:score,studentid:studentID,feedback:feedback}) // body data type must match "Content-Type" header
              });
              return response.json(); // parses JSON response into native JavaScript objects
          }
          
        postData('http://localhost:5000//updatestudentsubmission/')
            .then(data => {
                console.log(data);
            });
    }

