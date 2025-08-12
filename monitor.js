const pidusage = require('pidusage');
const {exec} = require('child_process');

const PID = process.pid; 
const CPU_THRESHOLD = 70;

function checkCPU() {
    pidusage(PID, (err, stats) =>{
        if (err) {
        return console.error('Error Checking CPU', err);
        }
   

    const cpu = stats.cpu;
    console.log(`CPU Usage : ${cpu}%`)

    if (cpu> CPU_THRESHOLD){
        console.log('cpu usage exceeded, restarting');
        exec('pm2 restart insuredmine')
    }

});

}

setInterval(checkCPU, 5000);