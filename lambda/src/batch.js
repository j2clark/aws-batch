/* == Imports == */
const AWS = require('aws-sdk');

const region = 'us-east-1';

/**
 * written to consume Cloudwatch events and fire off an AWS Batch Job
 *
 */

/* Lambda "main": Execution begins here */
exports.handler = function (event, context, callback) {

    let batchSvc = new AWS.Batch({
        region: region
    });


    const eventTime = new Date(event.time);
    const payload = event.detail;

    const source = payload.source;
    let zoneId = 'UTC';
    if ("zoneId" in payload) {
        zoneId = payload.zoneId;
    }

    let durationUnit = 'MINUTES';
    let durationAmount = '5';
    if (payload.duration) {
        const duration = payload.duration;
        if ("unit" in duration) {
            durationUnit = duration.unit;
        }
        if ("amount" in duration) {
            durationAmount = duration.amount;
        }
    }

    // there is a difference between event time, and job execution time
    // for example, if we wanted to extract something from a database,
    // we want to give the DB transaction time to commit before attempting extraction
    // so we may execute the job at 5:01, with a lag time of 1 minute, so job tim eis actually 5:00
    let startTime = eventTime;
    if (payload.delay) {
        let delay = payload.delay;
        if ("minutes" in delay) {
            startTime = subtractMinutes(startTime, delay.minutes);
        } else if ("seconds" in delay) {
            startTime = subtractSeconds(startTime, delay.seconds);
        } else if ("millis" in delay) {
            startTime = subtractMillis(startTime, payload.millis);
        } else {
            throw new Error("Unsupported value in delay: " + JSON.stringify(delay));
        }
    }

    let startDate = formatUTCDateTime(startTime);

    // this will need to be adapted to AWS Batch properties
    const cmdLine = '--source.name ' + source.name + ' --source.version ' + source.version + ' --job.date.zoneId ' + zoneId + ' --job.start.date ' + startDate + ' --job.duration.unit ' + durationUnit + ' --job.duration.amount ' + durationAmount;
    console.log('EXECUTE ->  ' + cmdLine);


    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Batch.html#submitJob-property

    let batchConf = payload.batch;
    let batchParams = {};
    if ("parameters" in batchConf) {
        batchParams = batchConf.parameters;
    } else {
        batchConf.parameters = batchParams;
    }
    batchParams['source.name'] = source.name;
    batchParams['source.version'] = source.version;
    batchParams['job.date.zoneId'] = zoneId;
    batchParams['job.start.date'] = startDate;
    batchParams['job.duration.unit'] = durationUnit;
    batchParams['job.duration.amount'] = durationAmount.toString();

    console.log(JSON.stringify(batchConf));

    // uncomment to actually execute AWS Batch job
    batchSvc.submitJob(batchConf, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
        data = {
         jobId: "876da822-4198-45f2-a252-6cea32512ea8",
         jobName: "example"
        }
        */
    });

    //callback(null, 'Finished');
};

function subtractMinutes(d, s) {
    return subtractSeconds(d, (60 * s));
}

function subtractSeconds(d, s) {
    return subtractMillis(d, (1000 * s));
}

function subtractMillis(d, millis) {
    return new Date(d.getUTCMilliseconds() - millis);
}

function formatUTCDateTime(d) {
    return formatUTCDate(d) + 'T' + formatUTCTime(d);
}

function formatUTCDate(d) {
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1, 2) + '-' + pad(d.getUTCDate(), 2);
}

function formatUTCTime(d) {
    return pad(d.getUTCHours(),2) + ':' + pad(d.getUTCMinutes(), 2);
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}