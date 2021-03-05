import { LightningElement, track } from 'lwc';
import serachAccs from '@salesforce/apex/LWCSearchCtrl.retriveAccs';

// datatable columns
const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}
    }, {
        label: 'Industry',
        fieldName: 'Industry',
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
    }, {
        label: 'Type',
        fieldName: 'Type',
        type: 'text'
    },
];
export default class LWCSearch extends LightningElement {
    @track searchData;
    @track columns = columns;
    @track errorMsg = '';
    strSearchAccName = '';
    

    handleAccountName(event) {
        console.log(event.detail.value);
        this.strSearchAccName = event.detail.value;
    }

    handleSearch() {
        console.log('searching..');
        if(!this.strSearchAccName) {
            this.errorMsg = 'Please enter account name to search.';
            this.searchData = undefined;
            return;
        }
        console.log('...searching..');
        serachAccs({strAccName : this.strSearchAccName})
        .then(result => {
            console.log('then..'+JSON.stringify(result));
            
            result.forEach((record) => {
                //console.log('record:'+JSON.stringify(record)[0]);
                console.log('Name:'+record.Name);
                console.log('Id:'+record.Id);
                //record.Name = '/' + record.Id;
            });
            
            this.searchData = result;
            console.log('result: '+JSON.stringify(result));
        })
        .catch(error => {
            this.searchData = undefined;
            window.console.log('error =====> '+JSON.stringify(error));
            if(error) {
                this.errorMsg = error.body.message;
            }
        }) 
    }

}