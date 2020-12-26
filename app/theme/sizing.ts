import { Dimensions } from "react-native"

const { width, height } = Dimensions.get('window')

const baseWidth = 360
const baseHeight = 640

const scaleWidth = width / baseWidth
const scaleHeight = height / baseHeight
const scale = Math.min(scaleWidth, scaleHeight)

export const scaledSize = size => Math.ceil(size * scale)
