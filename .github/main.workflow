workflow "Check PR" {
  on = "pull_request"
  resolves = [
    "Static analysis",
  ]
}

action "Install dependency" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Static analysis" {
  uses = "borales/actions-yarn@master"
  needs = ["Install dependency"]
  args = "s lint"
}

workflow "Deploy" {
  resolves = [
    "Deploy on server",
  ]
  on = "push"
}

action "Only on master" {
  uses = "actions/bin/filter@24a566c2524e05ebedadef0a285f72dc9b631411"
  args = "branch master"
}

action "Login to Docker" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  secrets = [
    "DOCKER_PASSWORD",
    "DOCKER_USERNAME",
  ]
  needs = ["Only on master"]
}

action "Build back image" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t igorkamyshev/holistic-erp-back -f Dockerfile-back ."
  needs = ["Login to Docker"]
}

action "Build front image" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t igorkamyshev/holistic-erp-front -f Dockerfile-front ."
  needs = ["Login to Docker"]
}

action "Push back image" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "push igorkamyshev/holistic-erp-back"
  needs = ["Build back image"]
}

action "Push front image" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "push igorkamyshev/holistic-erp-front"
  needs = ["Build front image"]
}

action "Deploy on server" {
  uses = "maddox/actions/ssh@master"
  needs = ["Push front image", "Push back image"]
  args = "cd /root/web/holistic-erp && docker-compose pull && docker-compose down && docker-compose up -d && docker-compose run back yarn evolutions:run && docker image prune -f"
  secrets = [
    "HOST",
    "USER",
    "PRIVATE_KEY",
    "PUBLIC_KEY",
  ]
}
