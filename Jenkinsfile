pipeline {
  agent any

  environment {
    IMG_NAME = 'gauri2004/node_img'
    PORT_MAPPING = '8081:3000'
    MINIKUBE_IP = '15.207.108.203'
  }

  stages {

    stage('check_files') {
      steps { sh 'ls -l' }
    }

    stage('Run Tests') {
      steps {
        echo 'Running Jest tests...'
        sh 'npm install'
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          echo "Building Docker Image ----->"
          docker build -t ${IMG_NAME}:latest .
        '''
      }
    }

    stage('Push Image') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-credential',
          usernameVariable: 'MY_DOCKER_USER',
          passwordVariable: 'MY_DOCKER_PASS'
        )]) {
          sh '''
            echo "$MY_DOCKER_PASS" | docker login -u "$MY_DOCKER_USER" --password-stdin
            docker push ${IMG_NAME}:latest
          '''
        }
      }
    }

    stage("Deploy to Minikube on EC2") {
      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY')]) {

          // Upload both YAML files
          sh """
            scp -i "$SSH_KEY" -o StrictHostKeyChecking=no deployment.yml service.yml \
            ubuntu@${MINIKUBE_IP}:/home/ubuntu/
          """

          // Apply deployment & service on EC2’s Minikube
          sh """
            ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no ubuntu@${MINIKUBE_IP} '
              kubectl delete -f deployment.yml --ignore-not-found=true
              kubectl delete -f service.yml --ignore-not-found=true

              kubectl apply -f deployment.yml
              kubectl apply -f service.yml

              kubectl get pods -o wide
            '
          """
        }
      }
    }
  }
}
