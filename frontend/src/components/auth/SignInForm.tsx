import React from 'react'

import Input from '../Input'
import logo from '../../img/logo.svg'

interface SignInFormProps {
	register: any
	onSubmit: any
	errors: any
	loginError: boolean
	loginErrorMessage: string
}

const SignInForm = ({ register, onSubmit, errors, loginError, loginErrorMessage }: SignInFormProps) => (
	<div className='flex items-center justify-center px-4 bg-gray-50 sm:px-6 lg:px-8'>
		<div className='w-full max-w-md'>
			<div>
				<img className='w-auto h-12 mx-auto' src={logo} alt='Workflow' />
				<h2 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>Sign in</h2>
			</div>
			{loginError && (
				<div
					className='max-w-sm px-4 py-2 mx-auto my-2 text-red-200 bg-red-500 border-t-4 border-red-800 rounded-lg'
					role='alert'
				>
					<div className='flex'>
						<svg
							className='w-6 h-6 mr-4 text-red-200 fill-current'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
						>
							<path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
						</svg>
						<div>
							<p className='text-sm'>{loginErrorMessage}</p>
						</div>
					</div>
				</div>
			)}
			<form onSubmit={onSubmit}>
				<div className='flex flex-col px-8 pt-6 pb-8 my-2 mb-4 rounded-lg'>
					<div className='flex flex-col items-center mb-6 -mx-3'>
						<div className='w-full px-3 mb-6'>
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
								error={errors.email ? true : false}
								errorMessage={errors.email ? errors.email.message : null}
							/>
						</div>

						<div className='w-full px-3 mb-6'>
							<Input
								name='password'
								type='password'
								placeholder='*********'
								refRegister={register({
									required: 'El campo contraseña es requerido.'
								})}
								error={errors.password ? true : false}
								errorMessage={errors.password ? errors.password.message : null}
							/>
						</div>
					</div>

					<div className='flex items-center justify-between mt-6'>
						<div className='flex items-center'>
							<input
								id='remember_me'
								type='checkbox'
								className='w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox'
							/>
							<label htmlFor='remember_me' className='block ml-2 text-sm leading-5 text-gray-900'>
								Remember me
							</label>
						</div>

						<div className='text-sm leading-5'>
							<p className='font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline'>
								Forgot your password?
							</p>
						</div>
					</div>

					<div className='mt-6'>
						<button
							type='submit'
							className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'
						>
							Sign in
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
)

export default SignInForm
