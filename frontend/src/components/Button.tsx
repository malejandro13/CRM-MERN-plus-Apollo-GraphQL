import React, { ReactEventHandler } from 'react'

type buttonType = 'button' | 'submit'

interface ButtonProps {
	type: buttonType
	title: string
	bgColor?: string
	hoverBgColor?: string
	textColor?: string
	hoverTextColor?: string
	borderColor?: string
	onClick?: ReactEventHandler
}

const Button = ({
	type,
	title,
	bgColor,
	hoverBgColor,
	textColor,
	hoverTextColor,
	borderColor,
	onClick
}: ButtonProps) => (
	<button
		type={type}
		className={`text-${textColor} hover:text-${hoverTextColor} bg-${bgColor} hover:bg-${hoverBgColor} border border-${borderColor} focus:outline-none text-xs font-semibold rounded-full px-4 py-2 leading-normal transition transition-colors duration-500 ease-in-out`}
		onClick={onClick}
	>
		{title}
	</button>
)

Button.defaultProps = {
	type: 'button',
	bgColor: 'transparent',
	hoverBgColor: 'black',
	textColor: 'black',
	hoverTextColor: 'white',
	borderColor: 'transparent'
} as Partial<ButtonProps>

export default Button
