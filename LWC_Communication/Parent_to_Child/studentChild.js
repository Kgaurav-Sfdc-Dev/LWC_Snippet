import { LightningElement,api} from 'lwc';

export default class StudentChild extends LightningElement {
//Public reactive property :means if parent component chages value then it reflect immedietly
  @api college ;
//if it is true then Only show the college in child Component 
  @api displayCollege =false;

}