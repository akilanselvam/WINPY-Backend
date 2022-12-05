const nodeCron = require("node-cron");

let count = 0;
const expression = "* * * * * *";
const toRun = ()=> {
    count++
    console.log(count)
};

const job = nodeCron.schedule(expression, toRun);

module.exports = job;