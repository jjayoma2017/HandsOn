trigger ContactTrigger on Contact (after insert,after update,before update) {
    ContactService.createPersonAccount(trigger.newMap,trigger.oldMap);
}