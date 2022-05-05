import { LightningElement } from 'lwc';

export default class CarChild extends LightningElement {

    dataToBeSend ;
    storeInputValue(event)
    {
          this.dataToBeSend =event.target.value;
         
    }
    sendDataToParentComponent()
    {
        const tileClicked =new CustomEvent('sendtoparent',{detail :  this.dataToBeSend } );
        this.dispatchEvent(tileClicked);
    }



}