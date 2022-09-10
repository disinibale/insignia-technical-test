import React from 'react'

type Props = {
  label?: any,
  size?: string,
  color?: string,
  rounded?: boolean,
  type?: any,
  disabled?: boolean,
  onClick?: (e:any) => void
}

export function Button({
  label,
  size = 'md',
  color = '',
  rounded = false,
  type = 'button',
  disabled = false,
  onClick
}: Props) {

  const buttonColor = (color: string): string => {
    switch (color) {
      case 'secondary':
        color = 'bg-gray-500'
        break
      case 'warning':
        color = 'bg-yellow-500'
        break
      case 'danger':
        color = 'bg-red-500'
        break
      case 'success':
        color = 'bg-green-500'
        break
      default:
        color = 'bg-blue-500'
    }

    return color
  }

  const buttonSize = (size: string): string => {
    switch (size) {
      case 'sm':
        size = 'py-2 px-4 text-xs'
        break
      case 'lg':
        size = 'py-6 px-8 text-lg'
        break
      default:
        size = 'py-4 px-6 text-base'
    }

    return size
  }

  const buttonRounded = (rounded: boolean): string => {
    let border = ''
    switch (rounded) {
      case true:
        border = 'rounded-md'
        break
      default:
        border = ''
    }

    return border
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
      ${buttonColor(color)} 
      ${buttonSize(size)} 
      ${buttonRounded(rounded)} text-white font-semibold
    `}>
      {label}
    </button>
  )
}