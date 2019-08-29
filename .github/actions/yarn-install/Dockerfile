FROM node:10

LABEL "com.github.actions.name"="yarn install"
LABEL "com.github.actions.description"="yarn install with SSH key"
LABEL "com.github.actions.icon"="lock"
LABEL "com.github.actions.color"="purple"

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
