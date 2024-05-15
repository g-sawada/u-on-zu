ARG APP_NAME=u-on-zu
ARG RUBY_IMAGE=ruby:3.2.3

# 自PCのアーキテクチャの関係で，amd64のイメージを明示する
FROM --platform=linux/amd64 $RUBY_IMAGE
ARG APP_NAME

ENV RAILS_ENV production
ENV BUNDLE_DEPLOYMENT true
ENV BUNDLE_WITHOUT development:test

# 自身で静的ファイルを配信する
ENV RAILS_SERVE_STATIC_FILES true
# Railsアプリのログを標準出力に出力
ENV RAILS_LOG_TO_STDOUT true

RUN mkdir /$APP_NAME
WORKDIR /$APP_NAME

RUN apt-get update -qq \
  && apt-get install -y ca-certificates curl gnupg \
  && mkdir -p /etc/apt/keyrings \
  && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
  && NODE_MAJOR=20 \
  && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
  && wget --quiet -O - /tmp/pubkey.gpg https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

  # ビルドツール，Node.js, Yarn, Vimのインストール
RUN apt-get update -qq && apt-get install -y build-essential libssl-dev nodejs yarn vim

RUN gem install bundler

COPY Gemfile /$APP_NAME/Gemfile
COPY Gemfile.lock /$APP_NAME/Gemfile.lock
RUN bundle install

COPY yarn.lock /$APP_NAME/yarn.lock
COPY package.json /$APP_NAME/package.json

COPY . /$APP_NAME/

# 一時的なSECRET_KEY_BASEを生成し,それを使用してアセットのプリコンパイルとクリーニングを行う
RUN SECRET_KEY_BASE="$(bundle exec rails secret)" bin/rails assets:precompile assets:clean \
# package.jsonに記載されたパッケージをインストール。開発依存を除外し，yarn.lockは変更しないことを保証
&& yarn install --production --frozen-lockfile \
&& yarn cache clean \
&& rm -rf /$APP_NAME/node_modules /$APP_NAME/tmp/cache

# entrypointは，herokuでもpryを使うことを想定してMVPリリース完了後まで使用しない
# ENTRYPOINT ["entrypoint.sh"]

# コンテナの3000番ポートを開放
EXPOSE 3000

# server.pidの削除，DB準備，サーバー起動
CMD [ "sh", "-c", "rm -f tmp/pids/server.pid && bin/rails db:prepare && bin/rails s" ]