pipeline {
  agent any

  environment {
    TEST_ENV = "local"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Start demo app container') {
      steps {
        sh '''
          set -e

          docker rm -f fashionhub-demo-app || true
          docker run -d --name fashionhub-demo-app -p 4000:4000 pocketaces2/fashionhub-demo-app

          echo "Waiting for fashionhub app to be ready..."
          for i in {1..30}; do
            if curl -sSf http://localhost:4000/fashionhub/ > /dev/null; then
              echo "App is up!"
              exit 0
            fi
            echo "App not ready yet, retry $i/30..."
            sleep 2
          done

          echo "App did not become ready in time"
          docker logs fashionhub-demo-app || true
          exit 1
        '''
      }
    }

    stage('Install dependencies') {
      steps {
        sh '''
          npm ci
        '''
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh '''
          npx playwright install
          TEST_ENV=local npx playwright test
        '''
      }
    }
  }

  post {
    always {
      sh 'docker rm -f fashionhub-demo-app || true'
      archiveArtifacts artifacts: 'playwright-report-*/**', fingerprint: true
    }
  }
}