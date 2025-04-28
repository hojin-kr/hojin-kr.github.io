import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hojin.Jang",
  description: "Hojin's Awesome Project",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '개요', link: '/index' },
      { text: 'Resume', link: '/resume' }
    ],

    sidebar: [
      {
        text: '개요',
        items: [
          { text: '개요', link: '/index' }
        ]
      },
      {
        text: 'DevOps',
        items: [
          { text: '- AWS CodePipeline 배포 구성', link: '/devops/aws-codepipeline-deploy-to-ec2'},
          { text: '- AWS EC2 디스크풀 이슈 확인 및 처리', link: '/devops/aws-ec2-instance-diskfull' },
          { text: '- AWS DynamoDB 설계 - 항목당 크기와 용량 사용량의 최적화', link: '/devops/aws-dynamodb-wcapaticy-adjust' },
          { text: '- GCP K8S 운영 노드풀 조정 실행 계획', link: '/devops/gcp-gke-k8s-nodefull-change' },
        ]
      },
      {
        text: 'DataLake',
        items: [
          { text: '- GCP Datastore를 이용한 BigQuery로의 데이터 수집', link: '/datalake/gcp-datastore-to-bigquery-dataflow' },
          { text: '- GCP Dataflow의 데이터 배치 처리', link: '/datalake/gcp-dataflow-batch-processing' },
        ]

      },
      {
        text: 'LoadTesting',
        items: [
          { text: '- 서버 부하 테스트: Multi GCP Compute Engine 및 Locust를 활용', link: '/loadtest/gcp-computeengine-loadtest-locust' }
        ]
      },
      {
        text: 'R&D',
        items: [
        ]
      },
      {
        text: 'Blog',
        items: [
          { text: '- AWS re:Invent 2023', link: '/blog/aws-reinvent-2023' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hojin-kr' }
    ]
  }
})
