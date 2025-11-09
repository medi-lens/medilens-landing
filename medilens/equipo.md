---
title: Quienes Somos
description: MEDI lens ha sido desarrollada por dos desarrolladores de Almería, conócenos un poco más :)

layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const linkedInIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#000000" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z"></path></svg>'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/9118664',
    name: 'Paul Guillamón Thiéry',
    title: 'Co-fundador y Desarrollador',
    // desc: 'Lorem ipsum dolor sit amet',
    links: [
      { icon: 'github', link: 'https://github.com/Qu4k3' },
      { icon: 'vitepress', link: 'https://qu4k3.com' },
      { icon: {
          svg: linkedInIcon
        },
        link: 'https://www.linkedin.com/in/paulguillamon'
      }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/20914374',
    name: 'Jose Sánchez Fuentes',
    title: 'Co-fundador y Desarrollador',
    // desc: 'Lorem ipsum dolor sit amet',
    links: [
      { icon: 'github', link: 'https://github.com/crimson3d' },
      { icon: {
          svg: linkedInIcon
        },
        link: 'https://www.linkedin.com/in/josé-antonio-sánchez-fuentes/'
      }
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
      <span class="logo-colored">MEDI lens</span>  ha sido creada por dos desarrolladores de Almería 🍅, con la misión de ofrecer una herramienta nativa, intuitiva y de utilidad pública, basada en datos oficiales de la AEMPS.<br/><br/>
Nuestro objetivo es facilitar el acceso a información sanitaria fiable, clara y accesible para todos.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
</VPTeamPage>
