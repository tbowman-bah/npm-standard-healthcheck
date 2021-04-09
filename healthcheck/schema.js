'use strict'
const utils = require('./util')

// when plugin loads
const startTime = Date.now()

/**
 * Endpoint response schema per [IETF definition for healthcheck  endpoints]
 * (https://tools.ietf.org/html/draft-inadarei-api-health-check-04)
 *
 * @params {Object} [opts = {}] base schema
 * @params {String} [opts.version = 'unknown'] application version number
 * @reutrns {Object} base schema
 */
function schema (opts = {}) {
	const uptimeMs = (Date.now() - startTime)
	return {
		status: opts.status || 'pass',
		version: opts.version || 'unknown',
		details: {
			uptime: {
				component_type: 'system',
				observed_value: uptimeMs,
				human_readable: utils.humanUptime(uptimeMs),
				observed_unit: 'ms',
				status: 'pass',
				time: new Date()
			}
		}
	}
}

module.exports = schema
