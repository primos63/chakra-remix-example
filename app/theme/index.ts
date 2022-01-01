import { extendTheme } from '@chakra-ui/react'
import IconSwitch from './components/icon-switch'

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false
  },
  components: {
    IconSwitch
  }
})