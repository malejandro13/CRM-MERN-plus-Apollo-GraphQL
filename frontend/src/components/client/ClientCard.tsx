import React from 'react'

interface IClient {
	id: string
	name: string
	surname: string
	age: string
	emails: Array<any>
}

const ClientCard = ({ client: { id, name, surname, company, age, type, emails } }: any) => (
	<div className='overflow-hidden bg-transparent'>
		<div className='px-2 pb-3 border-b border-gray-200'>
			<h3 className='text-lg font-medium leading-6 text-gray-900'>Order Intormation</h3>
			<p className='max-w-2xl mt-1 text-sm leading-5 text-gray-500'>Client personal details and order.</p>
		</div>
		<div>
			<dl>
				<div className='px-2 py-2'>
					<dd className='text-sm font-medium leading-5 text-gray-500'>Full name</dd>
					<dt className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>{`${name} ${surname}`}</dt>
				</div>
				<div className='px-2 py-2'>
					<dd className='text-sm font-medium leading-5 text-gray-500'>Age</dd>
					<dt className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>{age}</dt>
				</div>
				<div className='px-2 py-2'>
					<dd className='text-sm font-medium leading-5 text-gray-500'>Company</dd>
					<dt className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>{company}</dt>
				</div>
				<div className='px-2 py-2'>
					<dd className='text-sm font-medium leading-5 text-gray-500'>Emails address</dd>
					<dt className='mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2'>
						{emails.map((email: any, index: number) => <p key={index}>{email.email}</p>)}
					</dt>
				</div>
			</dl>
		</div>
	</div>
)

export default ClientCard
