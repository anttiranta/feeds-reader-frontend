// App imports
import { Type } from "./MessageInterface";
import MessageInterface from "./MessageInterface";

export default abstract class AbstractMessage implements MessageInterface
{
    protected message: string

    constructor(text: string = null) {
        this.message = text
    }

    abstract getType(): Type

    getText() {
        return this.message
    }

    setText(text: string) {
        this.message = text
    }
}