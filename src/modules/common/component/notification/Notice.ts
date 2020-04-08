// App imports
import AbstractMessage from "./AbstractMessage";
import { Type } from "./MessageInterface";

export default class Notice extends AbstractMessage
{
    getType() {
        return Type.TYPE_NOTICE
    }
}