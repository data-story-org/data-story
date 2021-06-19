import { pickBy } from '../../../../src/core/utils/Obj'

test('it can pick key values in object', () => {
	const nonZeroes = pickBy({a: 0, b: 1, c: 2}, (value, key) => {
		return value !== 0
	})

    expect(nonZeroes).toStrictEqual({b: 1, c: 2})
})