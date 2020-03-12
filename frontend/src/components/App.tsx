import React, { StrictMode } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import idx from 'idx'
import { Icon } from '@iconify/react'
import userIcon from '@iconify/icons-entypo/user'

import ListClient from '../pages/client/ListClient'
import CreateClient from '../pages/client/CreateClient'
import CreateProduct from '../pages/product/CreateProduct'
import Header from './Header'
import ListProduct from '../pages/product/ListProduct'
import UpdateClient from '../pages/client/UpdateClient'
import UpdateProduct from '../pages/product/UpdateProduct'
import CreateOrder from '../pages/order/CreateOrder'
import ListOrder from '../pages/order/ListOrder'
import Panel from '../pages/panel/Panel'
import CreateUser from '../pages/user/CreateUser'
import ListUser from '../pages/user/ListUser'
import SignIn from '../pages/auth/SignIn'
import Session from '../components/Session'

const App = ({ refetch, session }: { refetch: any; session: any }) => {
	let isAuth: boolean = false
	let userRole: string = ''
	let userName: string = ''
	let redirectLogin: any

	if (idx(session, (_) => _.getUserToken.success)) {
		isAuth = true
		userRole = idx(session, (_) => _.getUserToken.user.role)
		userName = idx(session, (_) => _.getUserToken.user.name)
	}

	if (!idx(session, (_) => _.getUserToken.success)) redirectLogin = <Redirect to='/signin' />
	return (
		<Router>
			<StrictMode>
				<Header isAuth={isAuth} userRole={userRole} />
				{isAuth ? (
					<p className='w-40 py-2 mt-2 ml-4 text-center text-white bg-indigo-900 rounded-lg text-normal'>
						<Icon className='inline-block w-4 h-4 -mt-2 fill-current' icon={userIcon} /> {userName}
					</p>
				) : null}
				{redirectLogin}
				<Switch>
					<Route exact path='/clients' component={ListClient} />
					<Route exact path='/client/create' component={CreateClient} />
					<Route exact path='/client/edit/:id' component={UpdateClient} />
					<Route exact path='/products' component={ListProduct} />
					<Route exact path='/product/create' component={CreateProduct} />
					<Route exact path='/product/edit/:id' component={UpdateProduct} />
					<Route exact path='/order/create/:id' component={CreateOrder} />
					<Route exact path='/orders/:id' component={ListOrder} />
					<Route exact path='/panel' component={Panel} />
					<Route exact path='/users' render={() => <ListUser userRole={userRole} />} />
					<Route exact path='/user/create' render={() => <CreateUser userRole={userRole} />} />
					<Route
						exact
						path={[ '/', '/signin' ]}
						render={() => <SignIn isAuth={isAuth} refetch={refetch} />}
					/>
				</Switch>
			</StrictMode>
		</Router>
	)
}

const RootSession = Session(App)

export { RootSession }
