import Submission from '@models/Listing'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const { id } = req.query

  switch (method) {
    case 'GET':
      try {
        const listing = await Submission.findById(id,
          ['name', 'about', 'image'])
        if (listing === null) {
          res.status(404).
            json({
              success: false,
              error: 'The listing with the specified ID does not exist',
            })
          return
        }
        res.status(200).json({ success: true, data: listing })
      } catch (e: any) {
        console.error(e)
        return
      }
      break
    case 'PATCH':
      try {
        const submission = await Submission.findByIdAndUpdate(id, body,
          { new: true })
        if (submission === null) {
          res.status(404).
            json({
              success: false,
              error: 'The listing with the specified ID does not exist',
            })
          return
        }
        res.status(200).json({ success: true, data: submission })
      } catch (e: any) {
        console.error(e)
        if (e.name === 'CastError') {
          res.status(404).
            json({
              success: false,
              error: 'The listing with the specified ID does not exist',
            })
          return
        }
        res.status(400).json({ success: false, error: e })
      }
      break

    case 'DELETE':
      try {
        const deletion = await Submission.findByIdAndDelete(id)
        if (deletion === null) {
          res.status(404).
            json({
              success: false,
              error: 'The listing with the specified ID does not exist',
            })
          return
        }
        res.status(200).json({ success: true, data: deletion })
      } catch (e) {
        console.error(e)
        res.status(400).json({ success: false, error: e })
      }
      break

    default:
      res.setHeader('Allow', 'GET, PATCH, DELETE')
      res.status(405).json({ success: false })
  }
}
