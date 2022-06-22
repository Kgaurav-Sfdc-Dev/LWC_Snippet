import { LightningElement } from 'lwc';

export default class CreateAndviewRecUsingBaseComponentRecordeditandView extends LightningElement {


    recordID ;
    successHandler(event)
    {
      this.recordID =event.detail.id;
     // alert(event.details.id);
    }






}