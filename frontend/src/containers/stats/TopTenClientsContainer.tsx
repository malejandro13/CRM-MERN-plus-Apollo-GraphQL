import React, { Fragment, useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { TOP_TEN_CLIENTS_QUERY } from '../../queries/StatsQuery'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import idx from 'idx'
import Loading from '../../components/Loading'

interface IClient {
	name: string
}

interface ITopClient {
	total: number
	client: Array<IClient>
}

interface IStats {
	total: number
	name: string
}

const TopTenClientsContainer = () => {
	const { loading, data } = useQuery(TOP_TEN_CLIENTS_QUERY, {
		fetchPolicy: 'no-cache'
	})

	const [ topClients, setTopClients ] = useState<Array<IStats>>([])

	useEffect(
		() => {
			const successResult = idx(data, (_) => _.getTopTenClients.success)
			const topClientsStats: Array<IStats> = []
			if (successResult) {
				idx(data, (_) => _.getTopTenClients.topClients).forEach((topClient: ITopClient, index: number) => {
					topClientsStats[index] = {
						name: topClient.client[0].name,
						total: topClient.total
					}
				})

				setTopClients(topClientsStats)
			}
		},
		[ data ]
	)

	return (
		<Fragment>
			{loading && <Loading />}
			<div className='w-full px-2 pt-10 mx-auto sm:w-2/3' style={{ height: 300 }}>
				<ResponsiveContainer>
					<BarChart
						width={500}
						height={300}
						data={topClients}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5
						}}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey='total' fill='#8884d8' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</Fragment>
	)
}

export default TopTenClientsContainer
