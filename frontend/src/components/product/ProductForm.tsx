import React from 'react'

import Button from '../Button'
import Label from '../Label'
import Input from '../Input'

interface ProductFormProps {
	register: any
	onSubmit: any
	errors: any
}

const ProductForm = ({ register, onSubmit, errors }: ProductFormProps) => (
	<form onSubmit={onSubmit}>
		<div className='flex flex-col px-8 pt-6 pb-8 my-2 mb-4 bg-white rounded-lg shadow-md'>
			<div className='mb-6 -mx-3 md:flex md:content-start md:flex-wrap'>
				<div className='px-3 mb-6 md:w-1/2'>
					<Label htmlFor='name' title='Name' />
					<Input
						name='name'
						type='text'
						placeholder='Name'
						refRegister={register({
							required: 'El campo nombre es requerido.',
							maxLength: {
								value: 200,
								message: 'El campo nombre no debe ser mayor que 200 caracteres.'
							}
						})}
						error={errors.name ? true : false}
						errorMessage={errors.name ? errors.name.message : null}
					/>
				</div>

				<div className='px-3 mb-6 md:w-1/2'>
					<Label htmlFor='price' title='Price' />
					<Input
						name='price'
						type='number'
						placeholder='Price'
						refRegister={register({
							required: 'El campo precio es requerido.',
							min: {
								value: 1,
								message: 'El campo precio debe ser de almenos 1 peso.'
							},
							pattern: {
								value: /^\d+$/,
								message: 'El campo precio debe ser numérico.'
							}
						})}
						error={errors.price ? true : false}
						errorMessage={errors.price ? errors.price.message : null}
					/>
				</div>

				<div className='px-3 mb-6 md:w-1/2'>
					<Label htmlFor='stock' title='Stock' />
					<Input
						name='stock'
						type='number'
						placeholder='Stock'
						refRegister={register({
							required: 'El campo stock es requerido.',
							min: {
								value: 1,
								message: 'El campo stock debe ser de almenos 1.'
							},
							pattern: {
								value: /^\d+$/,
								message: 'El campo stock debe ser numérico.'
							}
						})}
						error={errors.stock ? true : false}
						errorMessage={errors.stock ? errors.stock.message : null}
					/>
				</div>
			</div>

			<div className='self-end pt-5'>
				<Button
					type='submit'
					title='Guardar'
					bgColor='transparent'
					hoverBgColor='teal-500'
					textColor='teal-500'
					hoverTextColor='white'
					borderColor='teal-500'
				/>
			</div>
		</div>
	</form>
)

export default ProductForm
