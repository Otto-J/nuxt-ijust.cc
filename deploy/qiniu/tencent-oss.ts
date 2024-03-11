import fs from "fs";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

// 配置 AWS 凭证和区域
const region = process.env.TENCENT_REGIN;
const accessKeyId = process.env.TENCENT_AK!;
const secretAccessKey = process.env.TENCENT_SK!;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  endpoint: process.env.TENCENT_ENDPOINT,
});

// 要上传的本地文件夹路径
const localFolderPath = path.resolve(process.cwd(), "../../dist/public");

// S3 存储桶名称
const bucketName = process.env.TENCENT_BUCKET;

// 递归上传文件夹中的所有文件
async function uploadFolder(folderPath: string) {
  const files = await fs.promises.readdir(folderPath, { recursive: true });

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = await fs.promises.stat(filePath);

    if (stat.isDirectory()) {
    } else {
      const fileStream = fs.createReadStream(filePath);
      fileStream.on("error", (err) => console.error(err));

      const uploadParams = {
        Bucket: bucketName,
        Key: filePath.replace(localFolderPath, "").substring(1), // 去除本地路径前缀
        Body: fileStream,
      };

      const upload = new Upload({
        client: s3Client,
        params: uploadParams,
      });
      upload
        .done()
        .then((resp) => {
          if (resp.ETag) {
            console.log("ok", resp.Key);
          } else {
            console.log("Aborted");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  }
}

uploadFolder(localFolderPath);
