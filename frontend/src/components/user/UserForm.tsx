import React from 'react'

import Input from '../Input'
import Label from '../Label'
import Button from '../Button'
import { Icon } from '@iconify/react'
import chevronDown from '@iconify/icons-entypo/chevron-down'

interface UserFormProps {
	register: any
	onSubmit: any
	errors: any
	watch: any
	nameError: boolean
	nameErrorMessage: string
	emailError: boolean
	emailErrorMessage: string
	roleError: boolean
	roleErrorMessage: string
}

const UserForm = ({
	register,
	onSubmit,
	errors,
	watch,
	nameError,
	nameErrorMessage,
	emailError,
	emailErrorMessage,
	roleError,
	roleErrorMessage
}: UserFormProps) => (
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
							required: 'El campo nombre es requerido.'
						})}
						error={errors.name ? true : false || nameError}
						errorMessage={errors.name ? errors.name.message : nameError ? nameErrorMessage : null}
					/>
				</div>

				<div className='px-3 mb-6 md:w-1/2'>
					<Label htmlFor='email' title='Email' />
					<Input
						name='email'
						type='email'
						placeholder='Email'
						refRegister={register({
							required: 'El campo correo electrónico es requerido.',
							pattern: {
								value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
								message: 'El campo correo electrónico no es un correo válido.'
							}
						})}
						error={errors.email ? true : false || emailError}
						errorMessage={errors.email ? errors.email.message : emailError ? emailErrorMessage : null}
					/>
				</div>

				<div className='px-3 mb-6 md:w-1/2'>
					<Label htmlFor='password' title='Password' />
					<Input
						name='password'
						type='password'
						placeholder='*********'
						refRegister={register({
							required: 'El campo contraseña es requerido.',
							maxLength: {
								value: 15,
								message: 'El campo contraseña no debe ser mayor que 15 caracteres.'
							},
							minLength: {
								value: 6,
								message: 'El campo contraseña no debe ser menor que 6 caracteres.'
							}
						})}
						error={errors.password ? true : false}
						errorMessage={errors.password ? errors.password.message : null}
					/>
				</div>

				<div className='px-3 mb-6 md:w-1/2'>
					<Label htmlFor='passwordConfirm' title='Password Confirm' />
					<Input
						name='passwordConfirm'
						type='password'
						placeholder='*********'
						refRegister={register({
							validate: (value: any) =>
								value === watch('password') || 'La confirmación de contraseña no coincide'
						})}
						error={errors.passwordConfirm ? true : false}
						errorMessage={errors.passwordConfirm ? errors.passwordConfirm.message : null}
					/>
				</div>

				<div className='w-full px-3 mb-6'>
					<label
						className='block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker'
						htmlFor='grid-state'
					>
						Role
					</label>
					<div className='relative'>
						<select
							className='block w-full px-4 py-3 pr-8 border rounded appearance-none bg-grey-lighter border-grey-lighter text-grey-darker'
							name='role'
							ref={register}
						>
							<option value=''>Select role...</option>
							<option value='SELLER'>SELLER</option>
							<option value='ADMINISTRATOR'>ADMINISTRATOR</option>
						</select>
						<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none pin-y pin-r text-grey-darker'>
							<Icon icon={chevronDown} />
						</div>
					</div>
					{roleError && <p className='text-xs italic text-red-600'>{roleErrorMessage}</p>}
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

export default UserForm
