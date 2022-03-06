import Submission from '@models/Listing';
import dbConnect from '@lib/dbConnect';
import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const {method, body} = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const listings = await Submission.find({},
            ['name', 'about', 'image']);
        res.status(200).json({success: true, data: listings});
      } catch (e) {
        console.error(e);
        res.status(400).json({success: false});
      }
      break;

    case 'POST':
      if (!body) {
        res.status(400).
            json({success: false, error: 'POST body cannot be empty'});
        return;
      }
      try {
        // Check if submission with the same title already exists
        if (await Submission.findOne({name: body.name}) !== null) {
          res.status(400).
              json({
                success: false,
                error: 'A school with this name already exists',
              });
          return;
        }
        const submission = await Submission.create(body);
        res.status(201).json({success: true, data: submission});
      } catch (e: any) {
        if (e.errors.about.name === "ValidatorError") {
          res.status(400).json({success: false, error: e.errors.about.message});
        }
        console.error(e);
        res.status(400).json({success: false, error: e});
      }
      break;

    default:
      res.setHeader('Allow', 'GET, POST');
      res.status(405).json({success: false});
  }
}