import { Record, String, InstanceOf } from 'runtypes';

const GetItemsRecord = Record({
    id: String.optional(),
    name: String.optional(),
});

export const CheckGetItemRequest = (params: Object) => {
    return GetItemsRecord.check(params);
}