public with sharing class AccountManager {

    //method must be auraEnabled if we want to call mehtod from 
    //LWC 
    //If by using wire service then (cachable =true )
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccount()
    {
        return [select id ,Name,Phone from Account limit 5];
    }
}
