public with sharing class ContactService {
    public static String PERSON = 'Person';
    public static set<Id> updatedIds = new set<Id>();
    public static void createPersonAccount(Map<Id,Contact> newContacts,Map<Id,Contact> oldContacts){
        
        if(trigger.isBefore && trigger.isUpdate){
            for(Contact c: newContacts.values()){
                Contact newCon = newContacts.get(c.Id);
                Contact oldCon = oldContacts.get(c.Id);
                if(newCon.type__c!=oldCon.type__c && newCon.type__c==PERSON && !newCon.Person_Created__c){
                    c.Person_Created__c = true;
                    updatedIds.add(c.Id);
                    System.debug('@c update:'+c);
                }
                
            }
        }
        else{
            List<Contact> contacts = new List<Contact>();
            List<Account> accs = new List<Account>();
            System.debug('@updatedIds:'+updatedIds);
            for(Contact c: [Select Id, type__c,Name from Contact where Id in: updatedIds and Person_Created__c=:true]){
                if(c.type__c ==PERSON){
                    Account acc = new Account();
                    acc.name = c.Name;
                    accs.add(acc);
                }
            }
            System.debug('@insert accs:'+accs);
            if(accs.size()> 0){
                insert accs;
            }
        }
        
    }
}