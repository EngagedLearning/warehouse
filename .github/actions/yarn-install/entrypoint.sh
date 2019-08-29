#!/bin/sh -eu

SSH_PATH="/root/.ssh"

mkdir "$SSH_PATH"
touch "$SSH_PATH/known_hosts"

echo "$ENLEARN_BUILD_PRIVATE_KEY" > "$SSH_PATH/id_rsa"
ssh-keyscan github.com >> "$SSH_PATH/known_hosts"

chmod 700 "$SSH_PATH"
chmod 600 "$SSH_PATH/known_hosts"
chmod 600 "$SSH_PATH/id_rsa"

yarn install
