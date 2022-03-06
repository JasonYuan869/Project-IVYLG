# Dreamschools Fullstack Project
A simple fullstack application that fulfills requirements outlined in the project description.
Created with React and Next.js, using the ChakraUI component library.
Backend infrastructure runs on MongoDB and Google Cloud Storage.

The live server is published on Vercel and can be accessed at https://project-ivylg.vercel.app/.

## Features
 - Clean user interface with dark mode toggle and mobile support
 - Add, modify, and delete listings
   - Listings include a name, description, and an image that the user uploads to our cloud
 - Fully typed code written in Typescript
 - Fully documented API which can be found [here](docs/API)

## Known issues
 - The site may freeze for a brief period after selecting the image in the create/modify menu

## Next steps
 - Load listing data from the database in batches rather than all at once to improve scalability
 - Sort listings by a predicate (alphabetically, chronologically, distance, etc.)
 - Optimize images with a cloud script (AWS Lambda or similar) that will resize and convert images to the proper dimensions and filetype before uploading to the cloud
 - Implement user authentication for permission-based editing and deleting of listings
 - Add more data fields for the listing information (location, etc.)
