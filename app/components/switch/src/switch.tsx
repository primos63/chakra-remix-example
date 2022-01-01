import { useCheckbox, UseCheckboxProps } from '@chakra-ui/checkbox'
import { Spacer } from '@chakra-ui/react'
import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  HTMLChakraProps,
  SystemProps
} from '@chakra-ui/system'
import { cx, dataAttr, __DEV__ } from '@chakra-ui/utils'
import * as React from 'react'

import { SwitchIcon } from './switch-icon'

export interface IconSwitchOptions {
  /**
   * If added, the switch will show an icon before the switch's thumb.
   * @type React.ReactElement
   */
  leftIcon?: React.ReactElement
  /**
   * If added, the button will show an icon after the button's label.
   * @type React.ReactElement
   */
  rightIcon?: React.ReactElement
  /**
   * The space between the button icon and label.
   * @type SystemProps["marginRight"]
   */
  iconSpacing?: SystemProps['marginRight']
}

export interface SwitchProps
  extends Omit<UseCheckboxProps, 'isIndeterminate'>,
  Omit<HTMLChakraProps<'label'>, keyof UseCheckboxProps>,
  IconSwitchOptions,
  ThemingProps<'Switch'> {
  /**
   * The spacing between the switch and its label text
   * @default 0.5rem
   * @type SystemProps["marginLeft"]
   */
  spacing?: SystemProps['marginLeft']
}

type IconSwitchContentProps = Pick<
  SwitchProps,
  'leftIcon' | 'rightIcon' | 'children' | 'iconSpacing' | 'fontSize'
>

function IconSwitchContent(props: IconSwitchContentProps) {
  const { leftIcon, rightIcon, children, iconSpacing, fontSize } = props
  return (
    <chakra.span
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      {leftIcon && (
        <SwitchIcon fontSize={fontSize} marginEnd={iconSpacing}>
          {leftIcon}
        </SwitchIcon>
      )}
      {/* {children} */}
      {rightIcon && (
        <SwitchIcon fontSize={fontSize} marginStart={iconSpacing}>
          {rightIcon}
        </SwitchIcon>
      )}
    </chakra.span>
  )
}

export const Switch = forwardRef<SwitchProps, 'input'>((props, ref) => {
  const styles = useMultiStyleConfig('IconSwitch', props)

  const {
    spacing = '0.5rem',
    leftIcon,
    rightIcon,
    iconSpacing = '0.4rem',
    children,
    ...ownProps
  } = omitThemingProps(props)

  const {
    state,
    getInputProps,
    getCheckboxProps,
    getRootProps,
    getLabelProps
  } = useCheckbox(ownProps)

  const containerStyles: SystemStyleObject = React.useMemo(
    () => ({
      display: 'inline-block',
      position: 'relative',
      verticalAlign: 'middle',
      lineHeight: 'normal',
      ...styles.container
    }),
    [styles.container]
  )

  const trackStyles: SystemStyleObject = React.useMemo(
    () => ({
      display: 'inline-flex',
      flexShrink: 0,
      justifyContent: 'flex-start',
      boxSizing: 'content-box',
      cursor: 'pointer',
      ...styles.track
    }),
    [styles.track]
  )

  const labelStyles: SystemStyleObject = React.useMemo(
    () => ({
      userSelect: 'none',
      marginStart: spacing,
      ...styles.label
    }),
    [spacing, styles.label]
  )

  const contentProps = { rightIcon, leftIcon, iconSpacing }

  return (
    <chakra.label
      {...getRootProps()}
      className={cx('chakra-icon-switch', props.className)}
      __css={containerStyles}
    >
      <input
        className="chakra-icon-switch__input"
        {...getInputProps({}, ref)}
      />
      <chakra.span
        {...getCheckboxProps()}
        className="chakra-icon-switch__track"
        __css={trackStyles}
      >
        <IconSwitchContent
          {...contentProps}
          fontSize={styles.container.fontSize}
        />
      </chakra.span>
      <chakra.span
        __css={styles.thumb}
        className="chakra-icon-switch__thumb"
        data-checked={dataAttr(state.isChecked)}
        data-hover={dataAttr(state.isHovered)}
      />
      {children && (
        <chakra.span
          className="chakra-icon-switch__label"
          {...getLabelProps()}
          __css={labelStyles}
        >
          {children}
        </chakra.span>
      )}
    </chakra.label>
  )
})

if (__DEV__) {
  Switch.displayName = 'Switch'
}
