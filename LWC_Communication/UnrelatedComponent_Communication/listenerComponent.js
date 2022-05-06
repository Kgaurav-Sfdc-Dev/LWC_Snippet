import { LightningElement,track ,wire } from 'lwc';
import {registerListener,unregisterListener,unregisterAllListeners} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
/*
  Event was pushed by another Component into the PubSub
  Now listener will subscribe and listen for the changes 
  How ??
  1. import  registerListener mehtod from Pubsub
     so by using this mehtod  listener can subscribe for the event 
     Register for the listener will be done in the connectedcallBack() mehtod 
     so that at the time of component initialization registration of event by listener 
     is done 
    
    syntax to register :-->
    1st Param : eventName Which listen want to subscribe 
    2nd param : handler when listerner listen the changes 
    3rd Param : current Object 
    registerListener('pubsubtileclicked',this.onMeetingRoomSelectHandler,this);



  2.  
*/

export default class ListenerComponent extends LightningElement {

@track StudentInof={};

@wire(CurrentPageReference) pageRef ;

 connectedCallback()
 {
      registerListener('PassStudentInfoEvent',this.studentInfoFromPub,this);
 }
 /*disconnectedCallback()
 {
      unregisterAllListeners(this);
 }*/
studentInfoFromPub(payLoad)
{
  
  this.StudentInof.name =payLoad.name;
  this.StudentInof.college =payLoad.college;
  this.StudentInof.age =payLoad.age;
  this.StudentInof.branch =payLoad.branch;
  
}

}