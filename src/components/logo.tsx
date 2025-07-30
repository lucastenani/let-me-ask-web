import { Link } from 'react-router-dom'
import LogoDark from '@/assets/letmeask-logo-dark.svg'
import LogoLight from '@/assets/letmeask-logo-light.svg'
import { useTheme } from '@/components/theme-provider'

export function Logo() {
  const { theme } = useTheme()

  const logoSrc = theme === 'dark' ? LogoLight : LogoDark

  return (
    <Link to={'/'}>
      <img alt="Letme ask logo" loading="lazy" src={logoSrc} />
    </Link>
  )
}
