export enum Type {
    TYPE_ERROR = 'error',
    TYPE_NOTICE = 'notice',
    TYPE_SUCCESS = 'success'
}

export default interface MessageInterface {
    getType(): Type;
    getText(): string;
    setText(text: string): void;
}