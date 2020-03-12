import React from 'react'

import Button from '../Button'
import Label from '../Label'
import Input from '../Input'
import { Icon } from '@iconify/react'
import chevronDown from '@iconify/icons-entypo/chevron-down'
import trashIcon from '@iconify/icons-entypo/trash'

interface ClientFormProps {
	register: any
	onSubmit: any
	onClick: any
	errors: any
	fields: any
	remove: any
}

const ClientForm = ({ register, onSubmit, onClick, errors, fields, remove }: ClientFormProps) => (
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
							},
							pattern: {
								value: /^[a-z]+( +[a-z]+)*$/i,
								message: 'El campo nombre debe contener solo letras.'
							}
						})}
						error={errors.name ? true : false}
						errorMessage={errors.name ? errors.name.message : null}
					/>
				</div>
				<div className='px-3 mb-6 md:w-1/2'>
					<Label htmlFor='surname' title='Surname' />
					<Input
						name='surname'
						type='text'
						placeholder='Surname'
						refRegister={register({
							required: 'El campo apellido es requerido.',
							maxLength: {
								value: 200,
								message: 'El campo apellido no debe ser mayor que 200 caracteres.'
							},
							pattern: {
								value: /^[a-z]+( +[a-z]+)*$/i,
								message: 'El campo apellido debe contener solo letras.'
							}
						})}
						error={errors.surname ? true : false}
						errorMessage={errors.surname ? errors.surname.message : null}
					/>
				</div>

				<div className='px-3 mb-6 md:w-1/2'>
					<Label htmlFor='company' title='Company' />
					<Input
						name='company'
						type='text'
						placeholder='Company'
						refRegister={register({
							required: 'El campo empresa es requerido.',
							maxLength: {
								value: 200,
								message: 'El campo empresa no debe ser mayor que 200 caracteres.'
							},
							pattern: {
								value: /^\w+( +\w+)*$/,
								message: 'El campo empresa no permite caracteres especiales.'
							}
						})}
						error={errors.company ? true : false}
						errorMessage={errors.company ? errors.company.message : null}
					/>
				</div>
				<div className='px-3 mb-6 md:w-1/2'>
					<Label htmlFor='age' title='Age' />
					<Input
						name='age'
						type='number'
						placeholder='Age'
						refRegister={register({
							required: 'El campo edad es requerido.',
							min: {
								value: 1,
								message: 'El campo edad debe ser de almenos 1 año.'
							},
							max: {
								value: 125,
								message: 'El campo edad no debe ser mayor a 125 años.'
							},
							pattern: {
								value: /^\d+$/,
								message: 'El campo edad debe ser numérico.'
							}
						})}
						error={errors.age ? true : false}
						errorMessage={errors.age ? errors.age.message : null}
					/>
				</div>

				<div className='px-3 mb-6 md:w-1/2'>
					<label
						className='block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker'
						htmlFor='grid-state'
					>
						State
					</label>
					<div className='relative'>
						<select
							className='block w-full px-4 py-3 pr-8 border rounded appearance-none bg-grey-lighter border-grey-lighter text-grey-darker'
							name='type'
							ref={register}
						>
							<option value='BASIC'>BASIC</option>
							<option value='PREMIUM'>PREMIUM</option>
						</select>
						<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none pin-y pin-r text-grey-darker'>
							<Icon icon={chevronDown} />
						</div>
					</div>
				</div>

				{fields.map((item: object, index: string) => (
					<div key={index} className='px-3 mb-6 md:w-1/2'>
						<Label htmlFor='email' title='Email' />
						<div className='flex flex-no-wrap'>
							<Input
								name={`emails[${index}].email`}
								type='email'
								placeholder='example@email.com'
								refRegister={register({
									required: 'El campo correo electrónico es requerido.',
									pattern: {
										value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
										message: 'El campo correo electrónico no es un correo válido.'
									}
								})}
								error={errors.emails && errors.emails[index] ? true : false}
								errorMessage={
									errors.emails && errors.emails[index] ? errors.emails[index].email.message : null
								}
							/>

							<button onClick={() => remove(index)}>
								<Icon
									className='inline-block w-5 h-5 mx-1 text-gray-600 fill-current hover:text-red-600'
									icon={trashIcon}
								/>
							</button>
						</div>
					</div>
				))}
				<div className='flex justify-center px-3 mb-6 md:w-full'>
					<Button
						type='button'
						title='Agregar Email'
						bgColor='transparent'
						hoverBgColor='orange-500'
						textColor='orange-500'
						hoverTextColor='white'
						borderColor='orange-500'
						onClick={onClick}
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

export default ClientForm
