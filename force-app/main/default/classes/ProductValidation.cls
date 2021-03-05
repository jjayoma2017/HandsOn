public with sharing class ProductValidation {
    // Validate Product_Type__c field on save
    public static void validateType(Map<Id,Product2> newP){
        
        if(trigger.isBefore && (trigger.isUpdate || trigger.isInsert)){
            for(Product2 p: newP.values()){
                if(p.Product_Type_c__c=='' || p.Product_Type_c__c==null){
                    p.Product_Type_c__c.addError('Please select a value..');
                }
            }
        }
        
    }
}
