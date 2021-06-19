import { get } from '../../core/utils/Obj'

export const groupBy = (items, key) => {
	return items.reduce(
		(result, item) => ({
		  ...result,
		  [get(item, key)]: [
			...(result[get(item,key)] || []),
			item,
		  ],
		}), 
		{},
	)
}