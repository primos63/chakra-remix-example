import { switchAnatomy as parts } from '@chakra-ui/anatomy'
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject
} from '@chakra-ui/theme-tools'
import { calc, cssVar, mode } from '@chakra-ui/theme-tools'

const $width = cssVar('icon-switch-track-width')
const $height = cssVar('icon-switch-track-height')

const $diff = cssVar('icon-switch-track-diff')
const diffValue = calc.subtract($width, $height)

const $translateX = cssVar('icon-switch-thumb-x')

const baseStyleTrack: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    position: 'relative',
    borderRadius: 'full',
    p: '2px',
    width: [$width.reference],
    height: [$height.reference],
    transitionProperty: 'common',
    transitionDuration: 'fast',
    bg: mode(`${c}.600`, 'whiteAlpha.400')(props),
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  }
}

const baseStyleThumb: SystemStyleObject = {
  position: 'absolute',
  left: '2px',
  top: '2px',
  bg: 'white',
  transitionProperty: 'transform',
  transitionDuration: 'normal',
  borderRadius: 'full',
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    transform: `translateX(${$translateX.reference})`
  },
  _focus: {
    boxShadow: 'outline'
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  container: {
    [$diff.variable]: diffValue,
    [$translateX.variable]: $diff.reference,
    _rtl: {
      [$translateX.variable]: calc($diff).negate().toString()
    }
  },
  track: baseStyleTrack(props),
  thumb: baseStyleThumb
})

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    container: {
      fontSize: 'md',
      [$width.variable]: '2.875rem',
      [$height.variable]: '1.25rem'
    }
  },
  md: {
    container: {
      fontSize: 'xl',
      [$width.variable]: '3.875rem',
      [$height.variable]: '1.5rem'
    }
  },
  lg: {
    container: {
      fontSize: '2xl',
      [$width.variable]: '4.875rem',
      [$height.variable]: '1.75rem'
    }
  }
}

const defaultProps = {
  size: 'sm',
  colorScheme: 'gray'
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps
}
