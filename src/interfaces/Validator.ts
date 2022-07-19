export default interface Validation {
    key: string;
    type: 'string'|'number'|'boolean';
    required: boolean;
}