import React, { Fragment, useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { TOP_TEN_SELLERS_QUERY } from '../../queries/StatsQuery'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import idx from 'idx'
import Loading from '../../components/Loading'

interface ISeller {
	name: string
}

interface ITopSeller {
	total: number
	user: Array<ISeller>
}

interface IStats {
	total: number
	name: string
}

const TopTenSellersContainer = () => {
	const { loading, data } = useQuery(TOP_TEN_SELLERS_QUERY, {
		fetchPolicy: 'no-cache'
	})

	const [ topSellers, setTopSellers ] = useState<Array<IStats>>([])

	useEffect(
		() => {
			const successResult = idx(data, (_) => _.getTopTenSellers.success)
			const topSellersStats: Array<IStats> = []
			if (successResult) {
				idx(data, (_) => _.getTopTenSellers.topSellers).forEach((topSeller: ITopSeller, index: number) => {
					topSellersStats[index] = {
						name: topSeller.user[0].name,
						total: topSeller.total
					}
				})

				setTopSellers(topSellersStats)
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
						data={topSellers}
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

export default TopTenSellersContainer
