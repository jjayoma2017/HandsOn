import { LightningElement,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ProductCmp extends LightningElement {
    @track vidSelected = false;
    prodName = '';
    type='';
    timeStamp=null;
    @track errorMsg = '';
    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: event.detail.apiName + ' created.',
                variant: 'success',
            }),
        );
    }

    handleNameChange(event) {
        console.log("You selected: " + event.detail.value);
        this.prodName = event.detail.value;
    }
    handleTimeStamp(event) {
        console.log("You selected: " + event.detail.value);
        this.type = event.detail.value;
    }
    handleTypeSelect(event) {
        console.log("You selected: " + event.detail.value);
        
        if(event.detail.value==='Video'){
            this.vidSelected = true;
        }
    }
}