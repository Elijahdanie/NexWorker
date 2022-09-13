#!/bin/bash

cd $1
ffmpeg-b4.2.2.exe -framerate $3 -i "result_%05d.png" \
  -i $2 -c:a copy -shortest -c:v libx264 -pix_fmt yuv420p $4.mp4