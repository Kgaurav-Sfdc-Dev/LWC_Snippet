import { LightningElement } from 'lwc';

export default class DistrictParent extends LightningElement {

 value ="-none-";
 options =["-none-" ,"Banglore","Mysore","Udupi","Patna","Tumkur","Tiptur",
           "Coorg","Ooty","Sakleshpur"];
 optinsKeyVal =this.options.map(key=> ({ value: key, label: key }))


handleChange(event)
{
 console.log(event.detail.value);
 this.value =event.detail.value;
 this.callChild();
 
 
}
callChild()
{
   
    const chidComp  = this.template.querySelector('c-city-child');
    chidComp.getDisctrictName(this.value)
    
}
}