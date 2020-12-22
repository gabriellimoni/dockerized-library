import Knex from 'knex'
import knexConfig from './knexfile_runtime'
import { Model } from 'objection'

const config = process.env.NODE_ENV === 'production'
    ? knexConfig.production
    : knexConfig.development

const knex = Knex(config)
Model.knex(knex)
