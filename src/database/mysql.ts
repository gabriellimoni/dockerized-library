import Knex from 'knex'
import knexConfig from './knexfile_runtime'
import { Model } from 'objection'

const knex = Knex(knexConfig.development)
Model.knex(knex)
