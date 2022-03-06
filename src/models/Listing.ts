import { model, models, Schema } from 'mongoose'

interface Listing {
  name: string;
  about: string;
  image: string;
}

const schema = new Schema<Listing>({
  name: {
    type: String,
    required: [true, 'Please provide a school name'],
    maxLength: [60, 'Name cannot be more than 60 characters'],
  },
  about: {
    type: String,
    required: [true, 'Please provide a description for this school'],
    maxLength: [2000, 'Description cannot be more than 2000 characters'],
  },
  image: {
    type: String,
    required: [true, 'Please upload an image for this school'],
  },
}, { versionKey: false })

const Listing = models.Listing || model<Listing>('Listing', schema)

export default Listing

interface ListingData {
  _id: string;
  name: string;
  about: string;
  image: string;
}

export type { ListingData }