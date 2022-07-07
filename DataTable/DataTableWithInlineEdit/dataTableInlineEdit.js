import { LightningElement,wire ,track } from 'lwc';
import getAccounts from '@salesforce/apex/ContactManager.getAccountList';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



const COLUMNS = [
    { label: 'Name', fieldName:'Name', type: 'text' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone',editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email' ,editable: true},
     
  ];
export default class DataTableInlineEdit extends LightningElement {

columns = COLUMNS;
@track account =[];
recordFound;
error;
draftValues = [];
wiredAccountList;

@wire(getAccounts) accList(result) //Note :- Must use wire function 
{
this.wiredAccountList =result;
    if(result.data)
    {
        this.account =result.data;
        this.recordFound =true;
    }
    else if(result.error){
        this.recordFound =false;
        this.error =result.error;
    }
}
 


/*@wire(getAccounts) accList(result) {
    this.wiredAccountList = result;

    if (result.data) {
      this.account = result.data;
      this.recordFound =true;
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.recordFound =false;
      this.account = [];
    }
  }*/

async handleSave(event) {
    alert(event.detail.draftValues);
    console.log(event.detail.draftValues);
    // Convert datatable draft values into record objects
    const records = event.detail.draftValues.slice().map((draftValue) => {
        const fields = Object.assign({}, draftValue);
        return { fields };
    });

    // Clear all datatable draft values
    this.draftValues=[];

    try {
        // Update all records in parallel thanks to the UI API
        const recordUpdatePromises = records.map((record) =>
            updateRecord(record)
        );
        await Promise.all(recordUpdatePromises);

        // Report success with a toast
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Contacts updated',
                variant: 'success'
            })
        );

        // Display fresh data in the datatable
        return refreshApex(this.wiredAccountList);
    } catch (error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error while updating or refreshing records',
                message: error.body.message,
                variant: 'error'
            })
        );
    }
}


}