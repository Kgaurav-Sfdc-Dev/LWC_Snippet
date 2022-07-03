import { LightningElement,track } from 'lwc';

const columns = [

    { label: 'ID', fieldName: 'id' },
    {
        label: 'Age',
        fieldName: 'age',
        type: 'number',
        sortable: true,
        cellAttributes: { alignment: 'left' },
    },
    { label: 'name', fieldName: 'name', type: 'text' },
    { label: 'city', fieldName: 'city', type: 'text' },
    { label: 'location', fieldName: 'location', type: 'location' },
    { label: 'Description', fieldName: 'Description', type: 'text' }
   
];

export default class DemoMediaObject extends LightningElement {
    class1 ='slds-var-m-left_medium';
    columns =columns;
    searchKey;
   

    
    
    @track studentObj =[

    {
        id : 1,
        age : 25,
        name : 'gaurav',
        city : 'Blr' ,
        location : 'ks Layout' ,
        Description :'student in dsce 2015 -1019 '
    },
    {
        id : 2,
        age :25,
        name : 'bit',
        city : 'Blr' ,
        location : 'ks Layout' ,
        Description :'student in dsce 2015 -1019 '
    },
    {
        id : 3,
        age :26,
        name : 'order',
        city : 'Blr' ,
        location : 'ks Layout' ,
        Description :'student in dsce 2015 -1019 '
    },
    {
        id : 4,
        age :27,
        name : 'Techie',
        city : 'Blr1',
        location : 'ks Layout' ,
        Description :'student in dsce 2015 -1019 '
    },
    {
        id : 2,
        age :25,
        name : 'bio',
        city : 'Blr' ,
        location : 'ks Layout' ,
        Description :'student in dsce 2015 -1019 '
    }
 ] //end of array of Ojec t 

 @track allStudent =this.studentObj;
 
 handleRowSelection(event)
 {
    var selectedRows=event.detail.selectedRows;
    alert(selectedRows[0].id);
    console.log(selectedRows[0]); 
}

searchStudent(event)
{
    this.studentObj=this.allStudent;
    let searchKey = event.detail.value.toLowerCase();
    //filter list based On any condition
    const studentListNew = this.studentObj.filter(student => student.name.toLowerCase().includes(searchKey));
    this.studentObj=studentListNew;
 }



}