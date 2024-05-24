import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { buffer } from "stream/consumers";
import uniqid from "uniqid";
export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");
    const s3Client = new S3Client({
      region: "ap-southeast-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const bucket = "tpl-food-ordering";
    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: newFileName,
          ACL: "public-read",
          ContentType: file.type,
          Body: buffer,
        })
      );
      const link = "https://" + bucket + ".s3.amazonaws.com/" + newFileName;
      return Response.json(link);
    } catch (err) {
      console.log("Upload failed", err);
      return Response.json(
        {},
        {
          status: 400,
        }
      );
    }
  }
  return Response.json(true);
}