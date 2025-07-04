---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/9118664',
    name: 'Paul Guillamón',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/Qu4k3' }
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/20914374',
    name: 'Jose Sánchez Fuentes',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/crimson3d' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      El Equipo
    </template>
    <template #lead>
      MEDI Lens ha sido desarrollada por dos desarrolladores de Almería 🍅, con el objetivo de ofrecer una herramienta útil, nativa e intuitiva y basada en datos oficiales del CIMA.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
</VPTeamPage>
