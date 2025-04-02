#!/bin/bash

# Author : Vipul Dessai

distReadyFolderName="dist"
distMetadata="dist-package-metadata"
packageFileName=package.local.json
packageFileFinalName=package.json

read version <<< $(node -v)

echo "Proceeding with Node ${version:1:2}.x.x, continue? (y/n)"
read confirmNodeVersion

if [ $confirmNodeVersion == "n" ]; then
    exit
fi

if ! [ -d "./$distReadyFolderName/" ]; then
    echo "Please run \`npm run start:dev\` and then run this script"
    exit
fi

mv "./$distMetadata/$packageFileName" "./$distMetadata/$packageFileFinalName"
cp -r "./$distMetadata/$packageFileFinalName" "./$distReadyFolderName/"

cd "./$distReadyFolderName/"

npm i axios

npm link

cd "../"

mv "./$distMetadata/$packageFileFinalName" "./$distMetadata/$packageFileName"