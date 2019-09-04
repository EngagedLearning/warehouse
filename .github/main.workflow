workflow "Pull Request" {
  on = "pull_request"
  resolves = [
    "yarn lint",
    "yarn test",
  ]
}

action "yarn install" {
  uses = "./.github/actions/yarn-install"
  needs = ["check pr action"]
  secrets = [
    "ENLEARN_BUILD_PRIVATE_KEY"
  ]
}

action "yarn test" {
  uses = "docker://node:10"
  needs = ["yarn install"]
  runs = "yarn"
  args = "test"
}

action "yarn lint" {
  uses = "docker://node:10"
  needs = ["yarn install"]
  runs = "yarn"
  args = "lint"
}

action "check pr action" {
  uses = "actions/bin/filter@master"
  args = "action 'rerequested|opened|synchronize'"
}
