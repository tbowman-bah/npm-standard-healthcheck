const schema = require('./schema')
const hasUptimeProps = require('./util/has-uptime-props')

describe('schema', () => {
	it('params are optional', () => {
		expect(() => {
			schema()
		}).not.toThrow()
	})

	describe('response body', () => {
		let output

		beforeEach(() => {
			output = null
		})

		it('uptime increases over time', async () => {
			// near immediate
			output = schema()
			expect(output.details.uptime.observed_value).toBeLessThan(100)
			expect(output.details.uptime.observed_value).toBeGreaterThan(0)

			// sleep 2 seconds
			await new Promise((resolve, reject) => setTimeout(resolve, 2000))
			output = schema()
			expect(output.details.uptime.observed_value).toBeGreaterThan(2000)
			expect(output.details.uptime.observed_value).toBeLessThan(2200)
		})

		// uptime properties always included
		afterEach(() => {
			expect(hasUptimeProps(output.details.uptime)).toBe(true)
			expect(output.details.uptime.observed_unit).toEqual('ms')
		})

		describe('status', () => {
			it('defaults to `pass`', () => {
				output = schema()
				expect(output.status).toEqual('pass')
			})

			it('can be set', () => {
				output = schema({ status: 'fail' })
				expect(output.status).toEqual('fail')
			})
		})

		describe('version', () => {
			it('defaults to `unknown`', () => {
				output = schema()
				expect(output.version).toEqual('unknown')
			})

			it('can be set', () => {
				output = schema({ version: '1.0' })
				expect(output.version).toEqual('1.0')
			})
		})
	})
})
