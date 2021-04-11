const Web3 = require('web3')
const Tx = require("ethereumjs-tx").Transaction
let api = "https://kovan.infura.io/v3/a23217e338ca49568cc09f48b145c875";
const web3 = new Web3(api);

const myAccount = '0xc5817D3e37bc74Da54985fdeE45F355012d719a4';
const myprivKey = Buffer.from('66a90e9740aba4594fba733fc05c2d42b981082055218f05484eb1a4cb66f6a0', 'hex')

const mainABI  = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"bool","name":"deployed","type":"bool"}],"name":"ExamGovDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"student","type":"address"},{"indexed":false,"internalType":"bool","name":"registered","type":"bool"}],"name":"studentAdded","type":"event"},{"inputs":[{"internalType":"string","name":"examId","type":"string"}],"name":"addExam","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"fname","type":"string"},{"internalType":"string","name":"lname","type":"string"},{"internalType":"string","name":"IPFSPhotoLink","type":"string"},{"internalType":"string[4]","name":"schools","type":"string[4]"}],"name":"addStudent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deployExamGovernment","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"examGovAddy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"examGovernment","outputs":[{"internalType":"contract ExamCouncil","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalNumber","type":"uint256"}],"name":"getQuestions","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStudentExams","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"examId","type":"string"}],"name":"registerAsCandidate","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"IPFSLink","type":"string"}],"name":"submitAnswer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const mainContractAddress = "0x587B06236b7d65eb420E923d9B3BdE0ec42874D0"

mainContract = new web3.eth.Contract(mainABI, mainContractAddress);

//steps :
//ui gets info: currently hardcoded

const student = {
    'firstName' : 'Michael',
    'lastName' : "ameteku",
    'IPFS': 'asdfgfds',
    'schools' : ['sdfd', 'sdfs','dfgf', 'dfg']
}

const examName = "Chem1"

const registerStudent = mainContract.methods.addStudent(student['firstName'], student['lastName'], student['IPFS'], student['schools'])

const processEvent = mainContract.getPastEvents(
        'AllEvents',
        {
            fromBlock: 0,
            toBlock: 'latest'
        },
        (err, events) => {
            console.log("Answer is:", events[0].returnValues.type);
            if(events[0].returnValues.deployed == true) {
                console.log(events)
                const studentAccount = web3.eth.accounts.create();

                console.log('Student info is', studentAccount);
            }
        })

const deployedExam = mainContract.methods.deployExamGovernment();

const addExam = mainContract.methods.addExam(examName);

web3.eth.getTransactionCount(myAccount, (err, txCount) => {

 nextFunction = addExam.encodeABI();

//creating transaction stuff
const txObject = {
    nonce:  web3.utils.toHex(txCount),
    gasLimit : web3.utils.toHex(8000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: mainContractAddress,
    data: nextFunction
}

//sign transaction
const tx = new Tx(txObject, { chain: 'kovan'})
tx.sign(myprivKey)
const serializeTx = tx.serialize()
const raw = '0x' + serializeTx.toString('Hex')

// send of transaction
web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash: ', txHash)
}).once('receipt', (receipt)=> {
    console.log('receipt is: ', receipt);
    processEvent();
})

})











