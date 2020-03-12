import React from 'react'
import Table from '../Table'
import Button from '../Button'

const OrderForm = ({ headers, productsRow, submitCreateOrder }: any) => (
	<div className='flex flex-col px-2'>
		<h1 className='my-4 text-2xl text-center'>Resumen del Pedido</h1>
		<Table data={productsRow} headers={headers} />
		<div className='self-end pt-5'>
			<Button
				type='button'
				title='Guardar Pedido'
				bgColor='transparent'
				hoverBgColor='teal-500'
				textColor='teal-500'
				hoverTextColor='white'
				borderColor='teal-500'
				onClick={submitCreateOrder}
			/>
		</div>
	</div>
)

export default OrderForm
