import React, { Fragment } from 'react'
import TopTenClientsContainer from '../../containers/stats/TopTenClientsContainer'
import TopTenSellersContainer from '../../containers/stats/TopTenSellersContainer'

const Panel = () => (
	<Fragment>
		<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>
			Top ten customers, who buys the most
		</h1>
		<TopTenClientsContainer />
		<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>
			Top ten sellers, who sells the most
		</h1>
		<TopTenSellersContainer />
	</Fragment>
)

export default Panel
