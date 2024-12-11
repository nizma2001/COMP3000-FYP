const express = require('express');
const AWS = require('aws-sdk');

const router = express.Router();

// Configure AWS SDK



AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();


router.post('/presigned-url', (req, res) => {
    const { fileName, fileType } = req.body;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Expires: 120, // URL expiry limit - 120 seconds..
        ContentType: fileType,
    };

    s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
            console.error(err);
            alert(err);
            return res.status(500).json({ error: 'Error generating pre-signed URL' });
        }

        res.json({ presignedUrl: url });
        console.log("all ok");
       
    });
});

module.exports = router; 


