FROM node:0.12
# FROM node:4.0

MAINTAINER Zac Chung

# RUN ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa

RUN apt-get update && \
	apt-get install -y ssh vim gcc make build-essential git ruby-full && \
    gem install sass

# RUN npm install -g mean-cli && \
RUN npm install -g npm && \
    npm install -g bower && \
    npm install -g grunt-cli && \
    useradd -m loyo

RUN unlink /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Taipei /etc/localtime

ADD . /home/loyo

RUN chown loyo:loyo -R /home/loyo

USER loyo

WORKDIR /home/loyo

RUN npm install && bower install --config.interactive=false

CMD ["grunt", "serve:dist"]
