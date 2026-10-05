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
    avatar: '/assets/images/team/paul.webp',
    name: 'Paul Guillamón Thiéry',
    title: 'Producto, Gestión de Proyecto, Diseño UX/UI y Control de Calidad (QA)',
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
    avatar: '/assets/images/team/jose.webp',
    name: 'Jose Sánchez Fuentes',
    title: 'Desarrollo de la aplicación móvil para Android e iOS',
    links: [
      { icon: 'github', link: 'https://github.com/crimson3d' },
      { icon: {
          svg: linkedInIcon
        },
        link: 'https://www.linkedin.com/in/josé-antonio-sánchez-fuentes/'
      }
    ]
  },
  {
    avatar: '/assets/images/team/felipe.webp',
    name: 'Felipe Bernal Martinez',
    title: 'Backend, Infraestructura, Seguridad y DevOps',
    links: [
      { icon: {
          svg: linkedInIcon
        },
        link: 'https://www.linkedin.com/in/felipe-bernal-martinez-a140a483/'
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
      <p>Detrás de <span class="logo-colored">MEDI lens</span> hay un equipo pequeño y multidisciplinar que se formó alrededor de una idea simple: ofrecer una herramienta de utilidad pública, sobre medicamentos disponibles en España.</p><br/>
      <p>Buscamos acercar la información sanitaria a cualquier persona mediante una experiencia nativa e intuitiva, priorizando la fiabilidad de la información, la transparencia y la facilidad de uso.</p>
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members />
</VPTeamPage>