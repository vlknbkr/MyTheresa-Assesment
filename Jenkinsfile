pipeline {
  agent any

  environment {
    PATH = "/usr/local/bin:$PATH"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Debug Environment') {
      steps {
        sh '''
          echo "User: $(whoami)"
          echo "PATH: $PATH"
          uname -a
          if [ -f /etc/os-release ]; then
            cat /etc/os-release
          fi
          ls -l /usr/local/bin/docker || echo "Docker not found in /usr/local/bin"
          which docker || echo "Docker not in PATH"
        '''
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
          ENV=DEV npx playwright test
        '''
      }
    }
  }

  post {
    always {
      junit 'test-results/results.xml'
      sh 'docker rm -f fashionhub-demo-app || true'
      archiveArtifacts artifacts: 'playwright-report-*/**', fingerprint: true
    }
  }
}