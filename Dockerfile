FROM ubuntu:jammy

# 切换镜像源
RUN DOMAIN=mirrors.aliyun.com \
    && cd /etc/apt \
    && mv sources.list sources.list.bak \
    && echo "deb http://$DOMAIN/ubuntu/ jammy main multiverse restricted universe" > sources.list  \
    && echo "deb http://$DOMAIN/ubuntu/ jammy-backports main multiverse restricted universe" >> sources.list \
    && echo "deb http://$DOMAIN/ubuntu/ jammy-security main multiverse restricted universe" >> sources.list \
    && echo "deb http://$DOMAIN/ubuntu/ jammy-updates main multiverse restricted universe" >> sources.list \
    && apt-get clean \
    && apt-get update --fix-missing

# 同步时区
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && dpkg-reconfigure -f noninteractive tzdata

# 安装 curl
RUN apt-get install -y curl wget git

# 工作路径
WORKDIR /root

# 下载18.x的 nodejs
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash \
    && apt-get install -y nodejs

# 切换 npm 淘宝镜像源 安装 pnpm
RUN npm config set registry https://registry.npm.taobao.org \
    && npm install pnpm -g

# 复制修改后的 tech-study-node 项目
COPY tech-node ./tech-node

# 安装依赖
RUN cd ./tech-node && pnpm install

# 安装 google-chrome
RUN curl -o google-chrome-stable.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable.deb \
    && rm ./google-chrome-stable.deb

# 安装 puppteer 依赖
RUN apt-get install -y \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils

# 工作路径
WORKDIR /root/tech-node

# 挂载硬盘
VOLUME ["/root/tech-node/src/config","/root/tech-node/src/qrcode"]

# cmd
ENTRYPOINT ["/usr/bin/pnpm", "start"]
