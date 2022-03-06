import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import MulterGoogleCloudStorage from 'multer-cloud-storage'
import multer from 'multer'

const uploadHandler = multer({
  storage: new MulterGoogleCloudStorage({
    acl: 'publicRead',
  }),
})

const upload = uploadHandler.single('image')

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError (error, req, res) {
    console.error(error)
    res.status(500).
      json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch (req, res) {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ success: false })
  },
})

apiRoute.use(upload)

apiRoute.post((req, res) => {
  // @ts-ignore
  res.status(200).json({ success: true, data: req.file.linkUrl })
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}