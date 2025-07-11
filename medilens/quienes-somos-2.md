<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/9118664',
    name: 'Paul Guillamón Thiéry',
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
      { icon: 'github', link: 'https://github.com/crimson3d' }
    ]
  }
]
</script>

# El Equipo

Detrás de MEDI Lens hay dos desarrolladores de Almería 🍅 comprometidos con facilitar el acceso a la información médica y mejorar el uso cotidiano de los medicamentos.

<VPTeamMembers size="small" :members />