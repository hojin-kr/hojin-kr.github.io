import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hojin.Jang",
  description: "Hojin's Awesome Project",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'History', link: '/history' },
      {
        text: 'Article',
        items: [
          { text: 'DevOps', link: '/article/devops/' },
          { text: 'ETC', link: '/article/etc/' },
        ]
      }
    ],

    sidebar: [
      {
        text: 'DevOps',
        collapsed: true,
        items: [
          { text: 'Kubernetes Examples', link: '/article/devops/kubernetes-examples' },
          { text: 'Kubernetes Sample AWS EKS', link: '/article/devops/kubernetes-sample-aws-eks' },
          { text: 'AWS EC2 고가용성 아키텍처', link: '/article/devops/aws-ec2-ha-architecture' },
        ]
      },
      {
        text: 'ETC',
        collapsed: true,
        items: [
          { text: 'Unity Build in Github Action', link: '/article/etc/unity-build-automation-in-githubaction' },
          { text: 'GitHub Action, Artifact remove automation', link: '/article/etc/github-action-tip-artifact-remove-automation' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hojin-kr' }
    ]
  }
})
