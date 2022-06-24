import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DemoToastNotification extends LightningElement {

    displayToastSucc(event)
    {
       if(event.target.checked)
       {
        const evt = new ShowToastEvent({
            title: 'SUCCESS',
            message: 'what message we want to display ',
            variant: 'success'// [info ,success,error,warning]
           });  
           this.dispatchEvent(evt);
       }
       event.target.checked =false;
    }
    displayToastInfo(event)
    {
        if(event.target.checked)
       {
        const evt = new ShowToastEvent({
            title: 'INFO',
            message: 'what message we want to display ',
            mode :'pester', //it will remove the cut option only 
            variant: 'info'// [info ,success,error,warning]
           });  
           this.dispatchEvent(evt);
       }
       event.target.checked =false;
    }
    displayToastErr(event)
    {
        if(event.target.checked)
        {
         const evt = new ShowToastEvent({
             title: 'ERROR',
             message: 'what message we want to display ',
             variant: 'error'// [info ,success,error,warning]
            });  
            this.dispatchEvent(evt);
        }
        event.target.checked =false;
    }
    displayToastWar(event)
    {
        if(event.target.checked)
        {
         const evt = new ShowToastEvent({
             title: 'Warning',
             message: 'what message we want to display ',
             variant: 'warning'// [info ,success,error,warning]
            });  
            this.dispatchEvent(evt);
        }
        event.target.checked =false;
    }

}