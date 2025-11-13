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
          docker rm -f fashionhub-demo-app || true
          docker run -d --name fashionhub-demo-app -p 4000:4000 pocketaces2/fashionhub-demo-app
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