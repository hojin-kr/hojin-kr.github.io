import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hojin.Jang",
  description: "Hojin's Awesome Project",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '경력', link: '/history' },
      { text: '스터디', link: '/article/study/' },
    ],

    sidebar: [
      {
        text: 'Study',
        items: [
          { text: 'Go Grpc GCP Knative', link: '/article/go-grpc-gcp-knative'},
          {
            text: 'Kubernetes Series',
            collapsed: true,
            items: [
              { text: '쿠버네티스란 무엇인가', link: '/article/kubernetes-series-0' },
              { text: '도커와 컨테이너', link: '/article/kubernetes-series-1' },
              { text: '쿠버네티스를 구성하는 요소', link: '/article/kubernetes-series-2' },
              { text: '개발환경 세팅', link: '/article/kubernetes-series-3' },
              { text: '배포 & 조사 & 노출 & 스케일링 & 업데이트', link: '/article/kubernetes-series-4' },
              { text: '내 앱 빌드 & 배포', link: '/article/kubernetes-series-5' },
              { text: 'Helm', link: '/article/kubernetes-series-6' },
            ]
          },
          {
            text: 'ETC',
            collapsed: true,
            items: [
              { text: 'Kubernetes Examples', link: '/article/kubernetes-examples' },
              { text: 'Kubernetes Sample AWS EKS', link: '/article/kubernetes-sample-aws-eks' },
              { text: 'AWS EC2 고가용성 아키텍처', link: '/article/aws-ec2-ha-architecture' },
              { text: 'Unity Build in Github Action', link: '/article/unity-build-automation-in-githubaction' },
              { text: 'GitHub Action, Artifact remove automation', link: '/article/github-action-tip-artifact-remove-automation' },
            ]
          }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hojin-kr' }
    ]
  }
})
