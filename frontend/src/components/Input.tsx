import React from 'react'

interface InputProps {
	id?: string
	name: string
	type?: string
	placeholder?: string
	refRegister: any
	error?: boolean
	errorMessage?: string
}

const Input = ({ id, name, type, placeholder, refRegister, error, errorMessage }: InputProps) => {
	let message = null
	let className =
		'block w-full px-4 py-3 border rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter'

	if (error) {
		message = <p className='text-xs italic text-red-600'>{errorMessage}</p>
		className += ' border-red-600'
	}

	return (
		<div className='flex flex-col w-full'>
			<input className={className} id={id} name={name} type={type} placeholder={placeholder} ref={refRegister} />
			{message}
		</div>
	)
}

Input.defaultProps = {
	type: 'text',
	error: false
} as Partial<InputProps>

export default Input
