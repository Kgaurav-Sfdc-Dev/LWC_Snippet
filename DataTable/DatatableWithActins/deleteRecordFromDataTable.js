import { LightningElement, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { deleteRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
    { label: 'Edit', name: 'edit' },
];

const COLUMNS = [
    { label: 'First Name', fieldName: FIRSTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LASTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'Email' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];

export default class DeleteRecordFromDataTable extends NavigationMixin(LightningElement) {

columns =COLUMNS;

@track conList=[];
responseReceived;
recordIdTobeDelete;
queryLimit;

getUrCon(event)
{
    //if blank value  will be given then or val less that 1 or val grerater than 99
    if(!event.detail.value || event.detail.value < 1 || event.detail.value > 99 )
    {
        this.responseReceived =false;
    }
    else //if some value is given 
    {

    this.queryLimit =event.detail.value;
  getContacts({ NoOfRecord : this.queryLimit}).then(response =>{

        this.conList =response;
        this.responseReceived =true;
        console.log('size of datatable at from server ',this.conList.length);
        
  }).catch(error =>{
        console.error('error occured while fetching the data',error);
  });
}
}

handleRowAction(event)
{
   
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        const { Id } = row;
       // const ids =Id;

       

        switch (actionName) {
            // On delete show the notification and delete that record from 
            //the table Ui
            case 'delete':
                         {
                            //using wire adapter to delete the rec
                            deleteRecord(Id).then(response => {
                                //code to show notification 
                                const evt = new ShowToastEvent({
                                    title: 'SUCCESS',
                                    message: 'Record  '+Id+' '+'deleted Successfully',
                                    variant: 'success'// [info ,success,error,warning]
                                   });  
                                   this.dispatchEvent(evt);
                               //code to delete that record from list 
                             
                              //filter method will not modify thge existing list it will retunr 
                              //new array with element which pass the fun test 
                            const conLNew =this.conList.filter(con => con.Id != Id );                                  
                                                          
                            this.conList=conLNew;
                             console.log('size of datatable after filter  ',this.conList.length);
                            
                            }).catch(error => {
                            console.error('error occured while deletion',error.body.message);
                            
                            });
                         }

                          break;
           // On show details ->navigate to the record Page 
            case 'show_details':
                           {
                               
                            //code to Navigate to specified record Page 
                                 this[NavigationMixin.Navigate](
                                    {
                                        type: 'standard__recordPage',
                                attributes: {
                                   recordId: Id,
                                   objectApiName: 'Contact',
                                    actionName: 'view'
                                      }
                                    }
                                    
                                    
                                 );
                             



                           }
                           break;

            case 'edit' :
                {
                      //code to Navigate to specified record Page 
                      this[NavigationMixin.Navigate](
                        {
                            type: 'standard__recordPage',
                    attributes: {
                       recordId: Id,
                       objectApiName: 'Contact',
                        actionName: 'edit'
                          }
                        }
                        
                        
                     );

                }
                break ;
            default:
        }
       
        



}


}