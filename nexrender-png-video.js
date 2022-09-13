#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');

const execution = async (job, settings, {input, params})=>{
    try {
        
        const parentPath = settings.workpath + `/${job.uid}`;
        let outputFolder = 'C://Users/Administrator/Documents/Nexrender/Output';
        const destination = outputFolder + `/${params.output}`;
        if(!fs.existsSync(destination)){
            fs.mkdirSync(destination);
        }
        let audiofile = await copyFiles(parentPath, destination, input);
        let cmd = `fire.sh ${destination} ${audiofile} ${params.frame} ${destination}/${params.output}.mp4`;
        exec(cmd, (err, stdout, stderr)=>{
            if(err)
            {
                console.log(err, stderr);
            }
            console.log(err, stderr, stdout);
            let finalOuput = `${destination}/${params.output}.mp4`;
            if(fs.existsSync(finalOuput)){
            fs.copyFileSync(finalOuput, `${outputFolder}/${params.output}.mp4`);
            clean(destination);
            console.log(stdout);
            }else{
                console.log('cannot find result file', cmd);
            }
        });
    } catch (error) {
        console.log(error);
    }
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
    return new Promise((resolve, reject)=>{
  const path =parent;
  let files = fs.readdirSync(parent);
  let audiofileName = files.filter(file=>file.includes('.mp3'));
  let audiofilePath = parent + `/${audiofileName}`;
  //copy images
  exec(`mv ${parent}/*.${format} ${audiofilePath} ${target}`, (err, stdout, stderr)=>{
    if(err || stderr)
    {
        console.log(stderr, err);
        reject(err);
    }
    console.log(stdout);
    resolve(`${target}/${audiofileName}`);
  });
});
}

module.exports = execution;
