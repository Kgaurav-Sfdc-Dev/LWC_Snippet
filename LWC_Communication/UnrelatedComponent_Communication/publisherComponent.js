import { LightningElement,track,wire } from 'lwc';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
/*
fire event is a mehtod of pubsub which will fire the event 
and push the event in singleton Library so that anyanother Component 
can subscribe and listen the same 
Steps to push the event in singleton library 
1. Create the event 

    syntax to Create an event 
    const EventCreatedName  =new CustomEvent();

2. dispatch the event 
   
     syntax to dispatch the event 
     this.dispatchEvent(EventCreatedName);


3. fire the event by using fireEvent Mehthod and Pass the required Parameter 
    
     syantax to fire an event 
     1st param -->Page reference 
     2nd param -->fired event name 
     3rd param --->Data /Payload 
     fireEvent(this.pageRef,'pubsubtileclicked',this.valuetoSend);

     Note : --To get the Page reference first import the required mehtod 
              from the pubSub module 
              to get the fireEvent first import the the required mehtod from 
              the the Pubsub module 
*/
export default class PublisherComponent extends LightningElement {


StudentData ={};
//get the page reference of the Component 
@wire(CurrentPageReference) pageRef;


UpdateStudentName(event)
{
  
   this.StudentData.name =event.target.value;   
}
UpdateStudentCollege(event)
{
   this.StudentData.college =event.target.value; 
}
UpdateStudentBranch(event)
{
   this.StudentData.branch =event.target.value; 
}
UpdateStudentAge(event)
{
   this.StudentData.age=event.target.value; 
}
sendDataToListner()
{
  
   const EventCreatedName  =new CustomEvent();
   this.dispatchEvent(EventCreatedName);
   fireEvent(this.pageRef,'PassStudentInfoEvent',this.StudentData);
   /*it will push the event into the singleton library 
   another component can subscribe this event to listen the changes */

}

}