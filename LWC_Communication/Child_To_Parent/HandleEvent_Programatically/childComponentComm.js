import { LightningElement } from 'lwc';

export default class ChildComponentComm extends LightningElement {


   
    fireEvent(event)
    {

        //if parent component handle the event programatically then it can't listen child if bubble is not defined 
        //to make it listen make the bubble ==true 
         const inPutChange =new CustomEvent('inputvalchanged',{detail: event.target.value , bubbles :true});
         this.dispatchEvent(inPutChange);

    }




}