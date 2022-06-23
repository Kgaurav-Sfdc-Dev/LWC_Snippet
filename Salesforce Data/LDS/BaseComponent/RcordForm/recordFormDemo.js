import { LightningElement } from 'lwc';

export default class RecordFormDemo extends LightningElement {

    recordId;
    fieldArray =['Name','Phone','Type','BillingAddress'];
    handleSuccess(event)
    {
        this.recordId =event.detail.id;
    }





}