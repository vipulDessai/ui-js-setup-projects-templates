#!/bin/bash

# Author : Vipul Dessai (1826)

distReadyFolderName="dist"
distMetadata="dist-package-metadata"
npmDistMakerFolderName="dist-npm-module"
myPackage="my-npm-module"
nodeModulesFolderName="node_modules"
tarFileName="my-npm-module"
readmeFileName="README.md"
packageFileName=package.local.json
packageFileFinalName=package.json

npm run build

if ! [ -d "./$npmDistMakerFolderName" ]; then
    mkdir "./$npmDistMakerFolderName"
fi

if ! [ -d "./$npmDistMakerFolderName/$myPackage" ]; then
    mkdir "./$npmDistMakerFolderName/$myPackage"
fi

rm -rf "./$npmDistMakerFolderName/$tarFileName.tar.gz"

cp -r "./$distReadyFolderName/." "./$npmDistMakerFolderName/$myPackage"

cp "./$distMetadata/$packageFileName" "./$npmDistMakerFolderName/$myPackage"

cp "./$readmeFileName" "./$npmDistMakerFolderName/$myPackage"

cd "./$npmDistMakerFolderName/$myPackage"
mv "$packageFileName" "$packageFileFinalName"

npm i axios

rm -rf $nodeModulesFolderName

tar -czf "$tarFileName.tar.gz" --exclude="$tarFileName.tar.gz" .

mv "$tarFileName.tar.gz" ../

cd ../

rm -rf $myPackage