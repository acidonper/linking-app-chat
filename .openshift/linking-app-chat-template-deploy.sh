#!/bin/bash
####
# Red Hat
# @author: Asier Cidon
# @date: 20200330
####
#
# Process template to deploy a NodeJS App (Linking-app-chat)
#

usage() {
echo "Usage: $0 <project_name> <git_user> <git_password> "
echo "Example:"
echo "  ./linking-app-chat-template-deploy.sh <project_name> <git_user> <git_password> "
exit 1
}

[[ $# -eq 0 ]] && usage


PROJECT_NAME=$1
SERVICE_NAME="linking-app-chat"
SERVICE_GIT_URL="https://github.com/acidonper/linking-app-chat.git"
SERVICE_GIT_USER=$2
SERVICE_GIT_PASSWORD=$3

# Create a deployment config object charged with the container creation and inject environment variables 
oc process -f linking-app-chat-template.yaml  \
-p NAMESPACE=$PROJECT_NAME \
-p SERVICE_NAME=$SERVICE_NAME  \
-p SERVICE_GIT_URL=$SERVICE_GIT_URL \
-p SERVICE_GIT_USER=$SERVICE_GIT_USER  \
-p SERVICE_GIT_PASSWORD=$SERVICE_GIT_PASSWORD | oc create -f - -n $PROJECT_NAME

# Start build image
oc start-build bc/$SERVICE_NAME -n $PROJECT_NAME

# Wait for previous process
sleep 900

# Start deployment process
oc rollout latest $SERVICE_NAME -n $PROJECT_NAME