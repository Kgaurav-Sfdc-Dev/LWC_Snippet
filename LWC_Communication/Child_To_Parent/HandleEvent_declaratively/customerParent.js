import { LightningElement,track } from 'lwc';

export default class CustomerParent extends LightningElement {

  chidvAL ;

  GetValueFromChild(event)
  { 
   
     this.chidvAL = event.detail;
  }



}