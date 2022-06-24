import { LightningElement } from 'lwc';

import getAccountList from '@salesforce/apex/AccountManager.getAccount'

export default class ImperativeCallToApexMethod extends LightningElement {

limit;
accounts;
getQueryLimit(event)
{
  this.limit =event.target.value;
}

getALLAccount()
{
    getAccountList({NumberOfRecord : this.limit}).then(response =>{
          this.accounts =response;
    }).catch(error =>{
          console.error('error occured while fetching the data',error);
    });
    
}


}