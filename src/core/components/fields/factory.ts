import Boolean_ from './Boolean_'
import Number from './Number'
import JS from './JS'
import JSON_ from './JSON_'
//import Sheet from './Sheet'
import String_ from './String_'
import Select from './Select'
import Textarea from './Textarea'
import Where from './Where'

const fields = {
    Boolean_,
    JS,
    JSON_,
    Number,
	Select,
    //Sheet,
    String_,
	Textarea,
    Where,
}

export default (fieldType) => {
    return fields[fieldType]
}