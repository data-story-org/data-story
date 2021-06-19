import Feature from '../../../src/core/Feature'

test('a Feature can be instantiate from various types', () => {
    [
        'str', 123, [], {}, {foo: 'bar'},
    ].forEach(value => {
        expect(new Feature(value)).toBeInstanceOf(Feature)
    })
});

test('a Feature can hold attributes', () => {
    let feature = new Feature({
        foo: 'bar'
    })

    expect(feature.get('foo')).toBe('bar')
});

test('it can get dot notated attributes', () => {
	let feature = new Feature({
        user: {
			name: 'ajthinking'
		}
    })

    expect(feature.get('user.name')).toBe('ajthinking')
})