import React from 'react'

interface LabelProps {
	htmlFor?: string
	title: string
}

const Label = ({ htmlFor, title }: LabelProps) => (
	<label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2' htmlFor={htmlFor}>
		{title}
	</label>
)

export default Label
