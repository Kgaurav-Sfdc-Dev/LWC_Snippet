import { LightningElement } from 'lwc';
//importing createRecord function from the uiRecordApi module
//to create a new record use createrecord fn
//createRecord will bw used to create record which using
// the apex controller
import { createRecord } from 'lightning/uiRecordApi';
//lightning : is the name space 
//uiRecordApi : LDS is written on User interface so we import and the fn createrecord

export default class CreateRecordUsingLDS extends LightningElement {

    accountName;
    accountPhone;

    AccountNameChange(event)
    {
       this.accountName =event.target.value;
    }

    PhoneNameChange(event)
    {
        this.accountPhone =event.target.value;
    }
    CreateAccount()
    {
    //define fields what are the fields we using to insert a record 
     const fields = {'Name' : this.accountName ,'Phone' :this.accountPhone}
     const  recordIn ={apiName : 'Account' , fields};
     //createRecord will retunr thr promise --synschenus transactiuon 
     //which can be handlwed by then and catch
     //then --ececuted when is successfull 
     //catch --executed whne there is an ewrror ;
    createRecord(recordIn).then(response =>{
     console.log("account create successfully ",response.id);
    
    }).catch(error =>{
        console.log("account create fail error   ",error.body);
        console.log("account create failed  ",error.body.message);

    })
        

    } 





}