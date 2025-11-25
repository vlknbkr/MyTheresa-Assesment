pipeline {
  agent any

  environment {
    TEST_ENV = "local"
  }

  stages {

    stage('Checkout') {
      steps {
        deleteDir()
        checkout scm
      }
    }

    stage('Verify Docker') {
      steps {
        sh '''
          echo "Checking Docker availability..."
          docker --version
          docker ps
        '''
      }
    }

    stage('Start demo app container') {
      steps {
        sh '''
          set -e

          echo "Stopping any existing demo app container..."
          docker rm -f fashionhub-demo-app || true

          echo "Starting demo app on the shared Docker network..."
          docker run -d \
            --name fashionhub-demo-app \
            --network jenkins-net \
            -p 4000:4000 \
            pocketaces2/fashionhub-demo-app

          echo "Waiting for the demo app to be ready..."
          for i in {1..30}; do
            if curl -sSf http://fashionhub-demo-app:4000/fashionhub/ > /dev/null; then
              echo "Demo app is READY!"
              exit 0
            fi
            echo "App not ready yet... retry $i/30..."
            sleep 2
          done

          echo "Demo app did NOT become ready!"
          docker logs fashionhub-demo-app
          exit 1
        '''
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh '''
          npx playwright install --with-deps
          TEST_ENV=local npx playwright test --reporter=junit
        '''
      }
    }
  }

  post {
    always {
      echo "Collecting test results..."
      junit '**/results.xml'

      echo "Cleaning up environment..."
      sh 'docker rm -f fashionhub-demo-app || true'

      echo "Archiving reports..."
      archiveArtifacts artifacts: 'playwright-report-*/**', fingerprint: true
    }
  }
}