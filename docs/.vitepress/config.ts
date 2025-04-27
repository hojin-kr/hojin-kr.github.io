import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hojin.Jang",
  description: "Hojin's Awesome Project",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Overview', link: '/overview' },
      { text: 'DevOps', link: '/devops/' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Overview', link: '/overview' }
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
        text: 'LoadTesting',
        items: [
          { text: 'LoadTesting', link: '/loadtesting/' },
          { text: 'K6', link: '/loadtesting/k6' }
        ]
      },
      {
        text: 'R&D',
        items: [
          { text: 'Monitoring', link: '/monitoring/' },
          { text: 'Prometheus', link: '/monitoring/prometheus' },
          { text: 'Grafana', link: '/monitoring/grafana' }
        ]
      },
      {
        text: 'Blog',
        items: [
          { text: 'CI/CD', link: '/ci-cd/' },
          { text: 'GitHub Action', link: '/ci-cd/github-action' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hojin-kr' }
    ]
  }
})
