import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Hojin.Jang',
  description: "Hojin's Awesome Project",
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '개요', link: '/index' }
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
        collapsed: false,
        items: [
          {
            text: 'AWS',
            items: [
              { text: 'CodePipeline 구성', link: '/devops/aws-codepipeline-deploy-to-ec2' },
              { text: 'EC2 디스크풀 이슈', link: '/devops/aws-ec2-instance-diskfull' },
              { text: 'DynamoDB 항목당 크기 최적화', link: '/devops/aws-dynamodb-wcapaticy-adjust' },
              { text: 'RDS 업그레이드 제로 다운타임', link: '/devops/awa-rds-upgrade-zerodowntime' },
              { text: 'EC2 기반의 서비스 아키텍처', link: '/devops/aws-ec2-architecture-operation-thought' },
              { text: 'PHP 설정 최적화', link: '/devops/ec2-php-config-optimization' }
            ]
          },
          {
            text: 'GCP',
            items: [
              { text: 'K8S 운영 노드풀 조정', link: '/devops/gcp-gke-k8s-nodefull-change' },
              { text: 'Terraform & K8S', link: '/devops/iac-terraform-k8s' }
            ]
          }
        ]
      },
      {
        text: 'Data & Analytics',
        collapsed: false,
        items: [
          {
            text: 'DataLake',
            items: [
              { text: 'GCP BigQuery로의 데이터 수집', link: '/datalake/gcp-datastore-to-bigquery-dataflow' },
              { text: 'GCP Dataflow의 데이터 배치', link: '/datalake/gcp-dataflow-batch-processing' },
              { text: 'GCP GKE 데이터 레이크', link: '/datalake/gcp-gke-datalake' },
              { text: 'LLM으로 BI 업무 효율화', link: '/datalake/llm-bi-automation' }
            ]
          }
        ]
      },
      {
        text: 'Testing & Performance',
        items: [
          { text: '부하 테스트: Locust를 활용', link: '/loadtest/gcp-computeengine-loadtest-locust' }
        ]
      },
      {
        text: 'Blog',
        items: [
          { text: 'AWS re:Invent 2023', link: '/blog/aws-reinvent-2023' },
          { text: 'AI와 함께 기술 글 쓰는 방식', link: '/blog/ai-writing-tech-blog' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hojin-kr' }
    ]
  }
})
