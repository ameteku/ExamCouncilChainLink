# ExamCouncilChainLink
A proposed way of setting up and administering examinations using blockchain





Unbiased examination point allocation:
A blockchain where questions and answers from each student is recorded (without the students names) with their corresponding scores. This allows for teachers to give unbiased marks/scores to each students as the scores on each answer can be viewed by everyone and each answer checked against other answers. This also reduces the amount of time teachers need to meet with their students one on one to discuss what the correct answers are as a correct range of answers are already there.
Each student can also be given a random verifiable number and key in order to ensure there is no theft  of someone's exam for another and can be used to create anonymity in a class setting where students do not want their teachers to know their grades.

Ghana has a hooded way of examination marking for both high school and junior high school.  
There has been a history of cheating scandals happening both within the headquarters of the institution and in the foregrounds or from the creation of the exam questions to the release of the results to the allocation of schools.

Problems:

Case 1:
Creation of exams: Teachers are selected across the country to submit into a pool of questions for each exam. After, the questions are audited and the ones approved are grouped together. 
Getting close to the exam day of a subject like math, a random set of questions is selected and used for all the students writing in the country that day. 
Now during the time of the questions being printed and sent to the schools, people in charge of the distribution leak the questions to some students and this leads to biased and unfair examinations.



Case 2:  
After  the exam, students papers are gathered, sealed and sent over to the central authority. Once the papers of a particular subject is collected, they are redistributed to teachers who opt in to mark the exams. Although the papers gotten by teachers are somewhat randomized based on schools, it still gives room for falsification of grades by teachers as the names and schools are directly placed on the exam sheets( or answer sheets). There is also low transparency as. The papers of each student is not returned back to the student and we can therefore not know if it was graded right or wrong



Case3: 
After exams are graded. The grades of the students are sent back into one database calculations are made to determine which school to put you( out of the 4-5 schools you are allowed to select)
If your total calculated score meets the requirement of your top school, you will be placed in your selection. 
When a student does not like the school given them and knows a person working at the school allocation center, they can bribe them to modify either their grades or just place them in the school they want.

Solution:
Using blockchain, most of the problems can be eliminated through automation and transparency and moving most exams online.

Steps:
Each student can be given a unique id by a smart contract where only the smart contract knows the information of the students. 

For selection of questions:
 Each question in the question pool can be given a unique number. Then a smart contract not manipulated by anyone can be given the range of numbers and total number of questions to select for each section through randomness on the day of the exam. 
Or for a more complex way, because the exams are online, each student gets a question given to them by the smart contract and this question is stored alongside their id.
For identification of students:
Each student will be given that unique id the contract assigned their info. Upon arrival to the test centre, all the student needs to do is secretly enter their id/ fingerprint  into the smart contract using a UI. The smart contract returns  the face of the student and the examiner uses that to verify that the student is indeed not a fake (LOL).

For marking:
Because only the smart contract knows the information of the student, no randomness has to be done by a human. Each teacher can either :
Select their choice of ids(representing an anonymous student) 
Or the smart contract still randomizes the selection for each teacher
The marking is then done online with transparency and fairness as the  marks given for each answer to a particular id’s question can also be reviewed by the whole organization and the student either realtime or later on.

For allocation of schools: 
A smart contract retrieves the grades for each id number, does the final calculation and selects the school for the id based on the score gotten. Once this is done, the final allocation and score info can be stored either on the blockchain or in a blockchain database where it is immutable or untouchable.


 
Exam -1
Verifying - 1,1, 1

Parts Needed:
Blockchain( ethereum)
Blockchain Database  for storing questions and info of students(image, name, school, etc)
Chainlink verifiable random numbers
One large smart contract or 4 separate ones for each process of the examination.

UI for pushing the data of the student, and returning their unique id. 

UI for displaying the randomized questions selected by the blockchain and for submission of exam

UI for teachers to mark the exams online and submit the scores

UI to display marks given by teachers

UI to display a students allocation upon entry of their unique id.


![Untitled Diagram](https://user-images.githubusercontent.com/31578930/112093239-70800180-8b6f-11eb-914b-8b509c8c3078.jpg)

