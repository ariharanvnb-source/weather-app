
pipeline {
    agent any

    environment {
        DOCKERHUB_USER = '24mis0081'
        IMAGE_NAME = 'weather-app'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install and Test') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'npm install'
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKERHUB_USER%/%IMAGE_NAME%:%BUILD_NUMBER% .'
                bat 'docker tag %DOCKERHUB_USER%/%IMAGE_NAME%:%BUILD_NUMBER% %DOCKERHUB_USER%/%IMAGE_NAME%:latest'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DH_USER',
                        passwordVariable: 'DH_PASS'
                    )
                ]) {
                    bat '''
                        docker login -u "%DH_USER%" --password-stdin
                    ''' 
                }
                bat 'docker push %DOCKERHUB_USER%/%IMAGE_NAME%:%BUILD_NUMBER%'
                bat 'docker push %DOCKERHUB_USER%/%IMAGE_NAME%:latest'
            }
        }
    }

    post {
        success {
            echo 'Weather Application built and pushed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}
