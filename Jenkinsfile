pipeline {
  agent any

  environment {
    ENV = "DEV"
  }

  stages {
    stage('Checkout') {
      steps {
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

          echo "Stopping previous container..."
          docker rm -f fashionhub-demo-app || true

          echo "Starting demo app..."
          docker run -d --name fashionhub-demo-app \
            --network jenkins-net \
            pocketaces2/fashionhub-demo-app

          echo "Waiting for app..."
          for i in {1..30}; do
            if curl -sSf http://fashionhub-demo-app:4000/fashionhub/ > /dev/null; then
              echo "App is ready!"
              exit 0
            fi
            echo "Retry $i/30..."
            sleep 2
          done

          echo "App failed to start."
          docker logs fashionhub-demo-app
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
          ENV=DEV npx playwright test --reporter=junit
        '''
      }
    }
  }

  post {
    always {
      echo "Collecting test results..."
      junit '**/results.xml'

      echo "Cleaning up..."
      sh 'docker rm -f fashionhub-demo-app || true'

      echo "Archiving Playwright reports..."
      archiveArtifacts artifacts: 'playwright-report-*/**', fingerprint: true
    }
  }
}