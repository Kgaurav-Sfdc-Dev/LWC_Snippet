import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

// NavigationMixin it has two mehtod 
// 1. Navigate ==>  which accept pagereference  Object (js ) as parameter 
//

export default class DemoNavigationToDifferentPageRef extends NavigationMixin(LightningElement) {

    // create One Plain JavaScript Object which conform PageReference Object 
    // to conforms make sure to define only type and attributes Property of the plain Object 
    //state is Optional 
   
   
   
   
   //code to navigate to webPage
    pageRefToWeb ={
     type :'standard__webPage',
     attributes :{
        url :'https://www.lamborghini.com/en-en'
     }
     
    };
    openWebPage()
    {
        this[NavigationMixin.Navigate](
            this.pageRefToWeb 
            
        ); 

    }


    //code to navigate to Standard Object Home page 
    //home page of object will be the recently view list view 
    pageRefToObjHomePage ={
        type :'standard__objectPage',
        attributes :{
          objectApiName :'Account',
          actionName : 'home'
        }
       };
       openObjectHomePage()
       {
           this[NavigationMixin.Navigate](
               this.pageRefToObjHomePage 
           ); 
   
       }
    



    //Code to navigate to standard Object New Page 
    pageRefToObjNew ={
        type :'standard__objectPage',
        attributes :{
          objectApiName :'Account',
          actionName : 'new'
        }
       };
       openObjectNewPage()
       {
           this[NavigationMixin.Navigate](
               this.pageRefToObjNew 
           ); 
   
       }
    


    //code to navigate to Standaed Object list view

    pageRefToObjListView ={
        type :'standard__objectPage',
        attributes :{
          objectApiName :'Account',
          actionName : 'list'
        },
        //state is Optional we can provide the id of list view 
        //to navigate there 
        state :{
            filterName : '00B5g00000XimIcEAJ' //'Recent'
        }
       };
       openObjectListPage()
       {
           this[NavigationMixin.Navigate](
               this.pageRefToObjListView 
           ); 
   
       }
    



    //code to navigate to record page of any Object 
    //view and edit mode available 
    
    
    //view Mode 
    pageRefTospecificRecordView ={
       type : 'standard__recordPage',
       attributes : {
        recordId :'0015g00000lN5mTAAS',
        objectApiName :'Account',
        actionName :'view'
       }
    }
    openObjectrecordview()
    {
        this[NavigationMixin.Navigate](
        this.pageRefTospecificRecordView
        );
    }



    //edit mode 
    pageRefTospecificRecordEdit ={
        type : 'standard__recordPage',
        attributes : {
         recordId :"0015g00000lN5mTAAS",
         objectApiName :'Account',
         actionName :'edit'
        }
     }
    openObjectrecordEdit()
    {
        this[NavigationMixin.Navigate](
            this.pageRefTospecificRecordEdit
            );
    }






    //code navigation to some tab in application 
    pageRefToTabView ={
        type: 'standard__navItemPage',
        attributes : {
            apiName: 'Apex_Interaction' //name of custom should go there 
        }
    }
    openTabview()
    {
        this[NavigationMixin.Navigate](
            this.pageRefToTabView
            );
    }

    //code to navigate to some file (Named Page)
    pageRefTofileView ={
        type: 'standard__namedPage', 
        attributes: {
            pageName: 'filePreview'
        },
        state : {  
            // in recordIDS we can provide all the file contentdocumentID
            //whne user click it will navigate to selectrecrodID file 
            //
            recordIds: '0695g0000084HgxAAE,0695g0000084HgyAAE',
            selectedRecordId:'0695g0000084HgxAAE'
        }
    }
    openOfileview()
    {
        this[NavigationMixin.Navigate](
            this.pageRefTofileView
            );
    }

    //code to navigate to relationship object record 
    //account record childs like case ,oppotunity  we can navigate to 
    // Navigate to the CaseComments related list page
    // for a specific Case record.
    pageRefToRelationShipObject={
     type :'standard__recordRelationshipPage',
     attributes: {
        recordId: '0015g00000lN5mTAAS',
                objectApiName: 'Account',
                relationshipApiName: 'Contacts',
                actionName: 'view'
    },
    }
    openrelationshipOfSpecified()
    {
        this[NavigationMixin.Navigate](
            this.pageRefToRelationShipObject
            );
    }





}