require('dotenv').config()

const read = require('fs-readdir-recursive')
const fs = require('fs')
const { join, extname } = require('path')

const {
  PutObjectCommand,
  S3Client
} = require('@aws-sdk/client-s3')
const client = new S3Client({})

const outPath = join(__dirname, 'out');

(async () => {

  if (fs.existsSync(outPath)) {
    const dir_files = read(outPath)

    for (const file of dir_files) {
      await uploadObject(file)
    }

    console.log('Website deployed!')

  } else {
    console.log('Unexpected error')
  }

})()

async function uploadObject (object_path) {
  const object_content = fs.readFileSync(join(outPath, object_path))

  try {
    const input = {
      Bucket: process.env.S3_BUCKET,
      Key: object_path,
      Body: object_content,
      ACL: 'public-read',
      ContentType: getMimeType(extname(object_path)),
    }
    const command = new PutObjectCommand(input)
    await client.send(command)
    console.log('Uploaded ' + object_path)
  } catch (err) {
    console.error(err)
  }
}

function getMimeType (ext) {
  switch (ext) {
    case '.js':
      return 'application/javascript'
    case '.html':
      return 'text/html'
    case '.txt':
      return 'text/plain'
    case '.json':
      return 'application/json'
    case '.ico':
      return 'image/x-icon'
    case '.svg':
      return 'image/svg+xml'
    case '.css':
      return 'text/css'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.png':
      return 'image/png'
    case 'webp':
      return 'image/webp'
    case 'map':
      return 'binary/octet-stream'
    default:
      return 'application/octet-stream'
  }
}


