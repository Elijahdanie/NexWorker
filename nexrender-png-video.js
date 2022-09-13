#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');

const execution = async (job, settings, {input, params})=>{
    const parentPath = settings.workpath + `${job.uid}`;
    const destination = settings.output + `/${params.output}`;
    if(!fs.existsSync(destination)){
        fs.mkdirSync(destination);
    }
    let audiofile = await copyFiles(parentPath, destination, input);
    exec(`$ ./render.sh ${destination} ${audiofile} ${params.frame} ${params.output}`, (err, stdout, stderr)=>{
        if(err || stderr)
        {
            console.log(err, stderr);
            return;
        }
        fs.copyFileSync(`${destination}/result.mp4`, `${job.output}/${params.output}.mp4`);
        clean(destination);
        console.log(stdout);
});
}

const clean = (path) => {
    fs.rm(path, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    })
  }

const copyFiles = (parent, target, format) =>
{
    return Promise((resolve, reject)=>{
  const path =parent;
  let files = fs.readdirSync(parent);
  let audiofile = files.filter(file=>file.includes('.mp3'));
  //copy images
  exec(`mv *.${format} ${audiofile} ${target}`, (err, stdout, stderr)=>{
    if(err || stderr)
    {
        reject(err);
    }
    console.log(stdout);
    resolve(audiofile);
  });
});
}

module.exports = execution;
