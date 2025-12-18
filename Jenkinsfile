pipeline {
    agent {
        label "agent1"
    }
    stages {
        stage("code fetch") {
            steps {
                echo "Getting the code from the github"
                git url: "https://github.com/AbhishekPok/FinTrack.git", branch: "main"
            }
        }
        stage("build the code") {
            steps {
                echo "Building the code"
            }
        }
        stage("push the image to dockerhub") {
            steps {
               echo "Pushing the docker image to dockerhub"
            }
        }
        stage("deploy the code") {
            steps {
              echo "Deploying the code." 
            }
        }
    }
}
