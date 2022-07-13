import { LightningElement, track,wire,api } from 'lwc';
import getCaseList from '@salesforce/apex/CaseManagerDemoDataTable.fetchCase';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomDatatableDemo extends LightningElement {
    @api recordId; //testing not related to functionality 
    @track data = []; //hold the data for the ldt
    @track draftValues = []; //hold the changed data for the table after save it will be cleared 
    caseListToRefreshApex; //used to refresh the datatable with changed value 
    lastSavedData = []; //database data will be stored used when user click on the cancel button 
    columns; //provide columns to the ldt  
    connectedCallback() {
        this.columns = [
            { label: 'Case Number', fieldName: 'CaseNumber', editable: true }, 
            { label: 'Subject', fieldName: 'Subject', editable: true },
            {
                label: 'Priority', fieldName: 'Priority',wrapText: true, type: 'picklist', typeAttributes: {
                    placeholder: 'Choose Priority', options: [
                        { label: 'High', value: 'High' },
                        { label: 'Medium', value: 'Medium' },
                        { label: 'Low', value: 'Low' },
                    ] // list of all picklist options
                    , value: { fieldName: 'Priority' } // default value for picklist
                    , context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
                }
            }
        ];
    }
   
@wire(getCaseList) caseList(result) //Note :- Must use wire function 
{
this.caseListToRefreshApex =result;
    if(result.data)
    {
         this.data = result.data;
         this.lastSavedData = JSON.parse(JSON.stringify(this.data));
       
    }
    else if(result.error){
        this.data = undefined;
    }
}
    handleSelection()
    {

    }


    updateDataValues(updateItem) {
       

        let copyData = [... this.data];
        copyData.forEach(item => {
            if (item.Id === updateItem.Id) {
                for (let field in updateItem) {
                    item[field] = updateItem[field];
                }
            }
        });

        //write changes back to original data
        this.data = [...copyData];
    }
    //ES6 : ...spread syntax 
    // it 
    //called On cell change and called On picklist changed 
    updateDraftValues(updateItem) {
    
        let draftValueChanged = false;
        let copyDraftValues =this.draftValues    //[...this.draftValues];
        //store changed value to do operations
        //on save. This will enable inline editing &
        //show standard cancel & save button

        //Documentation 
        /*
         Update Item is new Object which has newly changed Value 
         when this method called then 
         copyDraftValue will have all the older draft value (if any value end user changed ,if not it is blank)
         once boolean declare here to keep eyes On that 

        IF Update Item id is already in the list then Update the field of of that corresponding Id with the UpdateItem Field
        make Boolean true that changes has been made 

        then copyDraftValue will have the fresh Data and the n
        assign to the this.defat value 


        if  id of UpdateItem is not in the List then simply add the UpdateItem Object in the draft Value 
        */
        copyDraftValues.forEach(item => {
            if (item.Id === updateItem.Id) { 
                for (let field in updateItem) {
                    item[field] = updateItem[field];
                }
                draftValueChanged = true;
            }
        });

        if (draftValueChanged) {
            this.draftValues = copyDraftValues;//    [...copyDraftValues];
        } else {
            this.draftValues = [...copyDraftValues, updateItem]; //it will add the updateItem in the deaft Value  
        }
    }

    //listener handler to get the context and data
    //updates datatable
    picklistChanged(event) {
       // alert('alert picklist changed');
        event.stopPropagation(); //it use to stop the Propogation that bubble from the child 
      
        let dataRecieved = event.detail.data; //it will return a Object with attributes : ID in Context and Priority in Value ,
        let updatedItem = { Id: dataRecieved.context, Priority: dataRecieved.value }; //Rating to Priority 
        this.updateDraftValues(updatedItem); //Update the dreaft Value send the argument as Object 
       // this.updateDataValues(updatedItem);
    }

    //handler to handle cell changes & update values in draft values
    handleCellChange(event) {
       //pass the Object to Update draft value method 
       //  alert(event.detail.draftValues[0]);
       //  console.log(event.detail.draftValues[0]);
        this.updateDraftValues(event.detail.draftValues[0]);
    }

    async handleSave(event) {
        //save last saved copy
        this.lastSavedData = JSON.parse(JSON.stringify(this.data));
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
                        message: 'case updated',
                        variant: 'success'
                    })
                );
        
                // Display fresh data in the datatable
                return refreshApex(this.caseListToRefreshApex);
            } catch (error) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while updating or refreshing records',
                        message: 'error occured',
                        variant: 'error'
                    })
                );
            }
    }

    handleCancel(event) {
        //remove draftValues & revert data changes
        this.data = JSON.parse(JSON.stringify(this.lastSavedData));
        this.draftValues = [];
    }
}