pipeline {
  agent any

  
  tools {
    nodejs 'NodeJS'
  }

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

          echo "Stopping any existing demo app container..."
          docker rm -f fashionhub-demo-app || true

          echo "Starting demo app attached to Jenkins network..."
          docker run -d \
            --name fashionhub-demo-app \
            --network container:jenkins \
            pocketaces2/fashionhub-demo-app

          echo "Waiting for the demo app to be ready..."
          i=0
          while [ $i -lt 30 ]; do
            if curl -sSf http://localhost:4000/fashionhub/ > /dev/null; then
              echo "Demo app is READY!"
              exit 0
            fi
            echo "App not ready yet... retry $i/30..."
            sleep 2
            i=$((i+1))
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
          mkdir -p test-results
          npx playwright install --with-deps
          ENV=DEV npx playwright test 
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