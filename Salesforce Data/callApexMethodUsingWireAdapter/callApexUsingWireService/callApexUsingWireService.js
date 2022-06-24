import { LightningElement, wire } from 'lwc';
//import the required method and give some alis name 
//this wireadapter will be used by the wire service to get the response data 
import getAccountList from '@salesforce/apex/AccountManager.getAccount'

export default class CallApexUsingWireService extends LightningElement {

//use wire service to store the response of the method 
//reponse are stone in Accounts
//accounts.data will have list of Account 
//accounts.error will have error message 
//if adapter provide the value then data property will have that data (error =Undefined)
//if adapter not provide any value then error Property have the error Object (data =undefined)
@wire(getAccountList)Accounts;

get reponseRecived()
{
    if(this.Accounts.data)
       return true ;

       return false ;
    
}




}