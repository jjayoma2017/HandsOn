public with sharing class ProductController {
    @AuraEnabled(Cacheable = true)
    public static Product2 retriveProduct(Id productId) {
        
        Product2 prodRec = [SELECT  Id, Name, Product_Type_c__c From Product2 WHERE Id  =:productId];
        System.debug('@prodRec:'+prodRec);
        if(prodRec!=null) {
            throw new AuraHandledException('No Record Found..');
        }
        return prodRec; 
    }
}
