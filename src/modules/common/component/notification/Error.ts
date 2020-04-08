// App imports
import AbstractMessage from "./AbstractMessage";
import { Type } from "./MessageInterface";

export default class Error extends AbstractMessage
{
    getType() {
        return Type.TYPE_ERROR
    }
}