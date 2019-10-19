const AWS = require('aws-sdk');
const s3 = new AWS.S3();

/* Lambda "main": Execution begins here */
exports.handler = function (event, context, callback) {

    let s3bucket = 'cf-templates-1e92wg90sg08a-us-west-1';

    var params = {
        Bucket: s3bucket, /* required */
        /*ContinuationToken: 'STRING_VALUE',*/
        //Delimiter: 'x',
        /*EncodingType: url,
        FetchOwner: true || false,
        MaxKeys: 'NUMBER_VALUE',*/
        Prefix: '2019079Ytm-designer'
        /*RequestPayer: requester,
        StartAfter: 'STRING_VALUE'*/
    };
    s3.listObjectsV2(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {

            data.Contents.forEach(function(c) {
                let name = c.Key;
                console.log(name);
            })
            //console.log(data);
        }           // successful response
        /*
        data = {
         Contents: [
            {

           ETag: "\"70ee1738b6b21e2c8a43f3a5ab0eee71\"",
           Key: "happyface.jpg",
           LastModified: <Date Representation>,
           Size: 11,
           StorageClass: "STANDARD"
          },
            {
           ETag: "\"becf17f89c30367a9a44495d62ed521a-1\"",
           Key: "test.jpg",
           LastModified: <Date Representation>,
           Size: 4192256,
           StorageClass: "STANDARD"
          }
         ],
         IsTruncated: true,
         KeyCount: 2,
         MaxKeys: 2,
         Name: "examplebucket",
         NextContinuationToken: "1w41l63U0xa8q7smH50vCxyTQqdxo69O3EmK28Bi5PcROI4wI/EyIJg==",
         Prefix: ""
        }
        */
    });

};