node {
    stage('Checkout') {
        checkout scm
    }

    stage('Deps') {
        echo '-- Installing dependencies -- '
        sh 'yarn'
        echo '-- Dependencies installed -- '
    }

    stage('Test') {
        echo '-- Testing the application -- '
        sh 'yarn'

        try {
          sh 'npm run test'
          echo '-- Tests passed -- '
        } catch(e) {
          echo '-- Tests failed -- '
          echo "Reason: ${e}"
        }
    }

    stage('Build') {
        echo '-- Building the application -- '
        sh 'npm run prod'
        echo '-- Build complete -- '
    }

    stage('Deploy') {
        echo '-- Deploying the application --'

        def remote = "${USERNAME}@${SERVER_IP}"

        sshagent(credentials: ['47f7eb21-7cb6-45a1-a348-8d8e10817dc0'], ignoreMissing: true) {
            sh "ssh ${remote} -p ${SSH_PORT} rm -rf ${FOLDER}"
            sh "scp -P ${SSH_PORT} -r dist/ ${remote}:${FOLDER}"
        }
    }
}
