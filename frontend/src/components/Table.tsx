import React from 'react'
import './styles/ClientList.css'

interface TableProps {
	data: any
	headers: any
}

const Table = ({ data, headers }: TableProps) => (
	<div className='flex flex-col'>
		<div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
			<div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 rounded-t-lg'>
				<table className='min-w-full'>
					<thead className='w-32 text-white'>
						<Table.TR>
							{headers.map(({ title }: { title: string }, index: string) => (
								<Table.TH key={index}>{title}</Table.TH>
							))}
						</Table.TR>
					</thead>
					<tbody className='bg-white'>
						{data.map((el: object, index: string) => (
							<Table.TR key={index}>
								{Object.values(el).map((el, index) => <Table.TD key={index}>{el}</Table.TD>)}
							</Table.TR>
						))}
					</tbody>
				</table>
			</div>
		</div>
	</div>
)

Table.TH = ({ children }: { children: any }) => (
	<th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-teal-500 border-b border-gray-200'>
		{children}
	</th>
)

Table.TR = ({ children }: { children: any }) => <tr>{children}</tr>

Table.TD = ({ children }: { children: any }) => (
	<td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>{children}</td>
)

export default Table
