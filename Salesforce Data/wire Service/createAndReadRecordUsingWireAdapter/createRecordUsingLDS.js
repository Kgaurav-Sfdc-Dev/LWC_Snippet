import { LightningElement, wire } from 'lwc';
//importing createRecord function from the uiRecordApi module
//to create a new record use createrecord fn
//createRecord will bw used to create record which using
// the apex controller
import { createRecord } from 'lightning/uiRecordApi';
//lightning : is the name space 
//uiRecordApi : LDS is written on User interface so we import and the fn createrecord
import { getRecord } from 'lightning/uiRecordApi';
//get record here is a wire adapters which is imported from Module as specified 
//get record adaptes is used used to red the data from sfdc
//will use wire service to read the data from wire adpters 

const fieldArray =['Account.Name' ,'Account.Phone','Account.CreatedById'];
export default class CreateRecordUsingLDS extends LightningElement {

    accountName;
    accountPhone;
    recordid;
    //wire service i am using to retrive thedata from sfdsx 
    //it accept two parameter 
    //wire adapytes and other argumennt 
    //and i am stroing the data in one Property ie . AccountRecord ;
    @wire(getRecord ,{recordId : '$recordid' , fields : fieldArray})AccountRecord;

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
     this.recordid =response.id;
    
    }).catch(error =>{
        console.log("account create fail error   ",error.body);
        console.log("account create failed  ",error.body.message);

    })

      

    } 
    get AccountName1()
    {
        if(this.AccountRecord.data)
        {
             console.log(this.AccountRecord.data.fields);
             return this.AccountRecord.data.fields.Name.value;
        }
        
        return undefined;
    }
    get AccountPhone1()
    {
        if(this.AccountRecord.data)
             return this.AccountRecord.data.fields.Phone.value;
        
        return undefined ;
    }
    





}