import { LightningElement } from 'lwc';

export default class ParentComponentComm extends LightningElement {




    response ;

    fecthResponse(event)
    {
        this.response =event.detail;
    }
   //below syntax will be followd to handle the fired event programatically 
    constructor()
    {
        super();
        //first arg : event name 
        //2nd agr : bind the event handler 
        
        this.template.addEventListener('inputvalchanged',this.fecthResponse.bind(this));
    }

}