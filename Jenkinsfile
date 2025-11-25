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

          echo "Stopping previous container (if exists)..."
          docker rm -f fashionhub-demo-app || true

          echo "Starting demo application container..."
          docker run -d --name fashionhub-demo-app \
            -p 4000:4000 \
            pocketaces2/fashionhub-demo-app

          echo "Waiting for fashionhub app to be ready..."
          for i in {1..30}; do
            if curl -sSf http://localhost:4000/fashionhub/ > /dev/null; then
              echo "App is up!"
              exit 0
            fi
            echo "App not ready yet, retry $i/30..."
            sleep 2
          done

          echo "App did not become ready in time!"
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