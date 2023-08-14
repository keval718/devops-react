import moment from 'moment';

const currentDate = moment().format('L').replace(/\//g, '');
const currentDayOfYear = moment().dayOfYear();
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const dateISO = new Date().toISOString();
const baseUrl = {
    s3BucketUrl: process.env.REACT_APP_AWS_S3_BUCKET_URL
}

export {
    baseUrl,
    currentDate,
    accessKey,
    secretKey,
    dateISO,
    currentDayOfYear
}