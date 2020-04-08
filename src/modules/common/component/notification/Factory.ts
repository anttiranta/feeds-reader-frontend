// App imports
import { Type } from "./MessageInterface";
import MessageInterface from "./MessageInterface";
import Error from "./Error"
import Notice from "./Notice"
import Success from "./Success"

export default class Factory
{
    static create(type: Type, text: string = null): MessageInterface {
        switch (type) {
            case Type.TYPE_ERROR:
                return new Error(text)
            case Type.TYPE_NOTICE:
                return new Notice(text)
            case Type.TYPE_SUCCESS:
                return new Success(text)    
        }
    }
}