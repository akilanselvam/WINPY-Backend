const nodeCron = require("node-cron");
const redis = require('redis');
const Queue = require('bull');
const client = redis.createClient();
let count = 0;
let redisconfig = {port:6379 };

function job(){
    
console.log('here');
let queue = new Queue('myQueue',{redis : redisconfig})
let timeout1 = 6000;
let timeout2 = 3000;
let data1 = {value: 'this'};
let data2 = {value: 'there'};
queue.add(data1, {repeat: {every: timeout1}});
queue.add(data2, {repeat: {every: timeout2}});
queue.process(async (job)=> {console.log(job.data)});
queue.on('completed', async(job)=>{console.log('completed'); await job.remove()});
}




// const expression = "* * * * * *";
// const toRun = ()=> {
//     console.log('this')
// };

// async function tutorial() {
//     console.log('this')
// }


// const job = nodeCron.schedule(expression, toRun);

module.exports = {job};