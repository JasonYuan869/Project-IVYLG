import {Storage} from "@google-cloud/storage"

if (!process.env.GCS_BUCKET_NAME) {
  throw new Error(
      'Please define the GCS_BUCKET_NAME environment variable inside .env.local',
  );
}

const storage = new Storage({keyFilename: '../../gcskey.json'});
const gcBucket = storage.bucket(process.env.GCS_BUCKET_NAME);

export default gcBucket;