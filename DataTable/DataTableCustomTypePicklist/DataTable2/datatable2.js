//import datatable so ,we can use all the properties of datatable 
import LightningDatatable from 'lightning/datatable';
//import the Custom template so that it can be reused
import DatatablePicklistTemplate from './datatableKahtm.html';
// methods from the platformResourceLoader module.
//use to read file when it is uploaded as static resource 
import {
    loadStyle
} from 'lightning/platformResourceLoader';
//import the static resource from salesforce for the Purpose of css
import CustomDataTableResource from '@salesforce/resourceUrl/dataSty';

export default class CustomDataTable extends LightningDatatable {

    //code to build up customTypes object 
    /*
     use keyWord static then  identifier 
     inside that add all object that custom types 

     attributes in custom type 
     1. template :  name of your  html file that imported 
     2. typeattributes : what are the attributes  use custom template
                         u want to pass
                         typeAttributes.attributeName


      once cusTomTpes create we can use that 
     
    */

    static customTypes = {
        picklist: {
            template: DatatablePicklistTemplate,
            typeAttributes: ['label', 'placeholder', 'options', 'value', 'context'],
        },
       
    };
    //code added by me 
  

   /* loadstyle here to load a css file 
    loadscript here to load a js file 
    loadStyle return a promise which resolved when file loaded successfully 
    it takes two argument as input 
    1.  reference to the component
    2.  referece to the file -->which is pointing to to the css file imported 
    
    */
   
    constructor() {
        super();
        Promise.all([
            loadStyle(this, CustomDataTableResource),
        ]).then(() => {})
    }
}
