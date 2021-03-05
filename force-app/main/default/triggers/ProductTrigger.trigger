trigger ProductTrigger on Product2 (before update,before insert) {
    ProductValidation.validateType(trigger.newMap);
}