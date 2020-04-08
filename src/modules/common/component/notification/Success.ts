// App imports
import AbstractMessage from "./AbstractMessage";
import { Type } from "./MessageInterface";

export default class Success extends AbstractMessage
{
    getType() {
        return Type.TYPE_SUCCESS
    }
}