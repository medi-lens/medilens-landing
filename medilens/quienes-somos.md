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

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/9118664',
    name: 'Paul Guillamón Thiéry',
    title: 'Creador',
    // desc: 'Lorem ipsum dolor sit amet',
    links: [
      { icon: 'github', link: 'https://github.com/Qu4k3' },
      { icon: 'vitepress', link: 'https://qu4k3.com' }
    ]
  },
    {
    avatar: 'https://avatars.githubusercontent.com/u/20914374',
    name: 'Jose Sánchez Fuentes',
    title: 'Creador',
    // desc: 'Lorem ipsum dolor sit amet',
    links: [
      { icon: 'github', link: 'https://github.com/crimson3d' },
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
      <span class="logo-colored">MEDI lens</span>  ha sido creada por dos desarrolladores de Almería 🍅, con la misión de ofrecer una herramienta nativa, intuitiva y de utilidad pública, basada en datos oficiales de la AEMPS (Agencia Española de Medicamentos y Productos Sanitarios).<br/><br/>
Nuestro objetivo es facilitar el acceso a información sanitaria fiable, clara y accesible para todos.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
</VPTeamPage>
