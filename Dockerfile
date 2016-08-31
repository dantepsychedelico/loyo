FROM node:4.5
# FROM node:4.2.3

MAINTAINER Zac Chung

RUN apt-get update && \
	apt-get install -y vim gcc make build-essential git ruby-full && \
    gem install sass

RUN npm install -g npm && \
    npm install -g bower && \
    npm install -g grunt-cli && \
    useradd -m loyo

RUN unlink /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Taipei /etc/localtime

ADD . /home/loyo

RUN chown loyo:loyo -R /home/loyo

USER loyo

WORKDIR /home/loyo

RUN npm install && bower install

CMD ["grunt", "serve:dist"]
