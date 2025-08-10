import { iconMap } from './iconMap'
/** @typedef {keyof typeof iconMap} IconName */

/**
 * 지정한 name에 해당하는 SVG 아이콘을 렌더링하는 컴포넌트
 *
 *
 * @param {{
 *   name: IconName,
 *   width?: number,
 *   height?: number,
 *   className?: string
 * }} props
 */

export const Icon = ({ name, width, height, className = '', ...props }) => {
  const SvgIcon = iconMap[name]

  if (!SvgIcon) {
    console.error(`"${name}" 아이콘은 등록되어있지 않습니다.`)
    return null
  }

  return <SvgIcon width={width} height={height} className={className} {...props} />
}
