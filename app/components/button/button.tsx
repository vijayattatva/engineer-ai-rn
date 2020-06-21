import * as React from "react"
import { TouchableOpacity, ActivityIndicator } from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { mergeAll, flatten } from "ramda"
import { color } from "../../theme"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    isLoading,
    ...rest
  } = props

  const viewStyle = mergeAll(flatten([viewPresets[preset] || viewPresets.primary, styleOverride]))
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  )

  const content = children || <Text tx={tx} text={text} style={textStyle} />
  const loader = children || <ActivityIndicator size="small" color={color.palette.white} />

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {isLoading ? loader : content}
    </TouchableOpacity>
  )
}
