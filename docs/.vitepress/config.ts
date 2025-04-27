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
          { text: 'AWS CodePipeline 배포 구성', link: '/devops/aws-codepipeline-deploy-to-ec2'},
          { text: 'EC2 디스크풀 이슈 확인 및 처리', link: '/devops/aws-ec2-instance-diskfull' },
        ]
      },
      {
        text: 'DataLake',
        items: [
          { text: 'GCP Datastore를 이용한 BigQuery로의 데이터 수집', link: '/datalake/gcp-datastore-to-bigquery-dataflow' },
        ]

      },
      {
        text: 'LoadTesting',
        items: [
          { text: '서버 부하 테스트: Multi GCP Compute Engine 및 Locust를 활용', link: '/loadtest/gcp-computeengine-loadtest-locust' }
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
          { text: 'AWS re:Invent 2023', link: '/blog/aws-reinvent-2023' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hojin-kr' }
    ]
  }
})
