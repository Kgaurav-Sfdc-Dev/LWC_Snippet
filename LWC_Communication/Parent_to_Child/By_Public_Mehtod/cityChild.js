import { LightningElement ,api} from 'lwc';

export default class CityChild extends LightningElement {


    districtFromParent ;
     displaySelection =false;
    @api
    getDisctrictName(DistrictName)
    {
       this.displaySelection =true;
        this.districtFromParent =DistrictName;
    }

}