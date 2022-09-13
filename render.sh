#!/bin/bash

ffmpeg.exe -framerate $3 -i "$1/result_%05d.png" -i $2 -c:a copy -shortest -c:v libx264 -pix_fmt yuv420p $4
