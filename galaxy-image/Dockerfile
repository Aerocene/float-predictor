FROM ubuntu:18.04

ENV DEBIAN_FRONTEND noninteractive
ENV UBUNTU_VERSION 18.04

###############################
# from meteor/galaxy base-image
RUN apt-get update && \
    apt-get --yes upgrade && \
    apt-get install -y curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Install some dependencies that Galaxy users have requested for their apps.  We
# document this list at http://galaxy-guide.meteor.com/base-image-packages.html
# Unfortunately, there's no safe way to upgrade any of these dependencies without
# potentially breaking existing users. We now encourage users to build their
# own custom base image rather than requesting us to install dependencies into
# the default base image.

# RUN apt-get update && \
#     apt-get install -y rsync phantomjs libcairo2-dev \
#       imagemagick libssl-dev wget xfonts-base xfonts-75dpi build-essential \
#       graphicsmagick git libjpeg-dev poppler-utils && \
#     rm -rf /var/lib/apt/lists/*

# RUN wget https://downloads.wkhtmltopdf.org/0.12/0.12.5/wkhtmltox_0.12.5-1.bionic_amd64.deb \
#     && dpkg -i wkhtmltox_0.12.5-1.bionic_amd64.deb \
#     && rm wkhtmltox_0.12.5-1.bionic_amd64.deb



####################
# from metero/galaxy

# Make sure we have xz-utils so we can untar node binary, and jq to parse
# star.json to choose the npm version.
RUN apt-get update && \
    apt-get install -y jq xz-utils && \
    rm -rf /var/lib/apt/lists/*

ADD ./app /app
RUN mkdir -p /app/bundle

# Include some popular versions of Node (last updated 2018-Jun-26; see
# docs/galaxy/base_image.md in the internal services repo for details on how to
# collect these stats). This reduces the size of the non-base image layers and
# speeds up app builds for apps using these versions. Other versions will still
# work.
#
# We avoid including any version older than 8.9.4, because some versions of npm
# older than 5.6.0 (included with 8.9.4) seem to hit
# https://github.com/npm/npm/issues/16807. The symptom is that running `npm -g
# install npm@xxx` from setup.sh would corrupt the npm installation, but only if
# Node is installed in a base image and npm is upgraded in the next image. So
# it's OK for setup.sh to install both Node and npm for older versions, but not
# for us to "cache" older Node versions.
# RUN NODE_VERSION="8.9.4" /app/install_node.sh
# RUN NODE_VERSION="8.11.1" /app/install_node.sh

########################
# floatpredictor-Install
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y wget git nano unzip powerstat apt-utils


# stuff for eventual scripts
#RUN apt-get install -y python python-numpy python-scipy cdo


#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# edit from here
#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

# start app
CMD /app/run.sh
