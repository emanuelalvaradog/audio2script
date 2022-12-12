import nextConnect from "next-connect";
import fs from "fs";
import fsPromises from "fs/promises";
import multer from "multer";
import { exec } from "child_process";
import getConfig from "next/config";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
  onError(err, req, res) {
    res.status(501).json({ error: err.message });
  },
});

apiRoute.use(upload.single("file"));

const { serverRuntimeConfig } = getConfig();

apiRoute.post((req, res) => {
  const outputDir = process.cwd() + "/public/uploads";
  const whisperCommand = `whisper './${req.file.path}' --language es --model base --output_dir '${outputDir}'`;
  // res.status(200).json({ message: ":D" });

  exec(whisperCommand, (err, stdout, stderr) => {
    if (err) res.status(300).json({ error: err, out: null });
    fs.readFile(
      `${outputDir}/${req.file.originalname}.txt`,
      "utf8",
      (err, data) => {
        if (err) res.status(500).json({ error: err });
        res.status(200).json({ error: stderr, out: data });
        fsPromises.readdir(outputDir).then((files) => {
          for (const file of files) {
            fsPromises.unlink(path.resolve(outputDir, file));
          }
        });
      }
    );
  });

  //
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
