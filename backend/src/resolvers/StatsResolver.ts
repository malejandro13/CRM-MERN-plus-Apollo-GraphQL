import StatsQuery from '../queries/StatsQuery'
import { IResolvers } from 'apollo-server-express'

/**
 * @description holds stats resolver
 */

const StatsResolver: IResolvers = {
	Query: StatsQuery
}

export default StatsResolver
