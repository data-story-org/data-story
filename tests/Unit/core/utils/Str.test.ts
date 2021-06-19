import { trim } from '../../../../src/core/utils/Str'

test('it can trim', () => {
    expect(trim('/cool/', '/')).toStrictEqual('cool')
})