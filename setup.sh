#!/bin/bash

VERSION=${VERSION-$(grep version bower.json | grep -o '[0-9.]*')}

case $1 in
    build)
        docker build -t loyo:$VERSION .
        ;;
    develop)
        docker run -d --name "loyo-$VERSION" -p 58080:9000 \
            -e NODE_ENV=development \
            loyo:$VERSION grunt
        ;;
    production)
        docker run -d --name "loyo-$VERSION" -p 58080:9000 \
            -e NODE_ENV=production \
            loyo:$VERSION grunt
        ;;
    *)
        echo "$(basename $0) :USAGE: [build]"
        exit 1
        ;;
esac
