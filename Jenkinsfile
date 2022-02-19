pipeline {
    agent
     {
        docker {
            image 'node:12.22.10-slim'
            args '-p 3000:3000'
        }
    }
     environment {
            CI = 'true'
            HOME = '.'

        }
    stages {
     
        stage('Cloning our Git') {
                steps {
                git 'https://github.com/xuanan93/nodejs1.git'
                }
            }
        stage('Build') {
            steps {
              echo "hello"
              sh 'npm install'
             
            }
        }
        stage('Test') {
                    steps {
                        sh 'jenkins/scripts/test.sh'
                    }
                }
        //         stage('Deliver') {
        //                     steps {
        //                         sh './jenkins/scripts/deliver.sh'
        //                         input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //                         sh './jenkins/scripts/kill.sh'
        //                     }
        //                 }

    }
}