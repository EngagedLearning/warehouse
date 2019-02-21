workflow "Pull Request" {
  on = "pull_request"
  resolves = [
    "yarn lint",
    "yarn test",
  ]
}

action "yarn install" {
  uses = "docker://node:10"
  needs = ["check pr action"]
  runs = "yarn"
  args = "install"
}

action "yarn test" {
  uses = "docker://node:10"
  runs = "yarn"
  args = "test"
  needs = ["yarn install"]
}

action "yarn lint" {
  uses = "docker://node:10"
  needs = ["yarn install"]
  runs = "yarn"
  args = "lint"
}

action "check pr action" {
  uses = "actions/bin/filter@master"
  args = "action 'opened|synchronize'"
}
