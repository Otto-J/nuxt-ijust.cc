import qiniu from "qiniu";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

// 配置七牛密钥

const accessKey = process.env.QINIU_AK;
const secretKey = process.env.QINIU_SK;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// 目标存储空间
const bucket = process.env.QINIU_BUCKET;

// 初始化上传凭证
const options = {
  scope: bucket,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

// 配置七牛上传
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
// const formUploader = (...args: any[]) => {
//   console.log(4, args);
// };
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

// 读取本地目录

async function uploadDirectory(dirPath: string) {
  const files = await readdir(dirPath, { recursive: true });
  // console.log(files);

  files.forEach(async (file) => {
    const filePath = path.join(dirPath, file);
    const stats = await stat(filePath);
    // console.log(filePath, stats);
    if (stats.isDirectory()) {
      //   uploadDirectory(filePath); // 递归处理子目录
    } else {
      const key = filePath.replace(/\\/g, "/"); // 替换路径分隔符
      const localFile = filePath;
      console.log(key, localFile);
      //   // 上传文件
      //   formUploader.putFile(
      //     uploadToken,
      //     key,
      //     localFile,
      //     putExtra,
      //     (respErr, respBody, respInfo) => {
      //       if (respErr) {
      //         console.error("上传失败:", respErr);
      //       } else {
      //         console.log("上传成功:", respBody);
      //       }
      //     },
      //   );
    }
  });
}

// 上传 dist 目录
const distDir = "../../dist/public";
uploadDirectory(distDir);
