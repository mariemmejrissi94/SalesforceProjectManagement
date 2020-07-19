public with sharing class SprintController {
    @AuraEnabled
    public static List <Sprint__c> loadData (string accId){
        return [SELECT Name, staricon__c,iconstatus__c,Description_Sprint__c, date_debut__c, date_fin__c,priorite__c,Projet__r.Name, Etat__c From Sprint__c ORDER BY date_fin__c ASC NULLS LAST];
    }
    
      @AuraEnabled
    public static Sprint__c UpdateRecord(String conid){
        return [SELECT Id,Name,description_sprint__c,date_debut__c,date_fin__c,priorite__c,Etat__c,Projet__c FROM Sprint__c WHERE Id =:conid];
    }  
    @AuraEnabled
public static Sprint__c updateRecordsprint(Id conid,String Naame,String deesc, Date date1, Date date2,Integer priorite,String etaat,String projet) {

      
    Sprint__c c = [Select Name,description_sprint__c,date_debut__c,date_fin__c,priorite__c,Etat__c FROM Sprint__c WHERE Id =:conid];
    c.Name=Naame;
    c.description_sprint__c=deesc;
    c.date_debut__c=date1;
    c.date_fin__c=date2;
    c.priorite__c=priorite;
    c.Etat__c=etaat;
    c.Projet__c=projet;
  
    system.debug('c Project++ '+c);
        try {
        if(c != null)
        update c;
        } catch (Exception e) {
        throw new AuraHandledException('Unable to Update Sprint:'  + e.getMessage());
        }
        return c;
        
        }
    @AuraEnabled
       public static List<Sprint__c> showdetail (String conid){
        return [SELECT Id,Name,description_sprint__c,date_debut__c,date_fin__c,priorite__c,Etat__c FROM Sprint__c WHERE Id =:conid];
    }  
    @AuraEnabled
       public static List<UserStory__c> showuser (String conid){
        return [Select Id, Name FROM UserStory__c where Sprint__c=:conid];
    } 
    @AuraEnabled
    public static String saveTodoRecord(Sprint__c toDoRecord){
        String message;
        Database.saveResult sr = Database.insert(toDoRecord,false);
        if(!sr.isSuccess()){
            for(Database.error err : sr.getErrors()){
                message += err.getMessage();
            }
        }
        return message;
    }
    @AuraEnabled
    public static String saveTodoRecorde(UserStory__c toDoRecord){
        String message;
        Database.saveResult sr = Database.insert(toDoRecord,false);
        if(!sr.isSuccess()){
            for(Database.error err : sr.getErrors()){
                message += err.getMessage();
            }
        }
        return message;
    }

    @AuraEnabled        
    public static List<String> getPickListValuesIntoList(String objectType, String selectedField){
        List<String> pickListValuesList = new List<String>();
        Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult res = convertToObj.getDescribe();
        Schema.DescribeFieldResult fieldResult = res.fields.getMap().get(selectedField).getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }     
        return pickListValuesList;
    }

    @AuraEnabled
    public static list < Sprint__c > fetchSprint() {
     list < Sprint__c > returnConList = new List < Sprint__c > ();
    
     List < Sprint__c > lstCon = [SELECT Name, staricon__c,iconstatus__c,Description_Sprint__c, date_debut__c, date_fin__c,priorite__c,Projet__r.Name, Etat__c From Sprint__c ORDER BY date_fin__c ASC NULLS LAST LIMIT 50];
     // play for loop on lstCon and add each Sprint__c to returnConList List.
     for (Sprint__c c: lstCon) {
      returnConList.add(c);
     }
    // return the List of Sprint__cs
     return returnConList;
    }
    @AuraEnabled
    public static list < Projet__c > fetchprojet() {
     list < Projet__c > returnConList = new List < Projet__c > ();
    
     List < Projet__c > lstCon = [SELECT Id,Name,Description_projet__c,date_debut__c,date_fin__c,Etat__c FROM Projet__c ORDER BY date_fin__c ASC NULLS LAST];
     // play for loop on lstCon and add each Sprint__c to returnConList List.
     for (Projet__c c: lstCon) {
      returnConList.add(c);
     }
    // return the List of Sprint__cs
     return returnConList;
    }
 
  
    @AuraEnabled
    public static List < String > deleteRecords(List < String > lstRecordId) {
     // for store Error Messages  
     List < String > oErrorMsg = new List < String > ();
     // Query Records for delete where id in lstRecordId [which is pass from client side controller] 
     List < Sprint__c > lstDeleteRec = [select Id from Sprint__c where id IN: lstRecordId];
     
     // delte Sprint__c list with Database.DeleteResult[] database class.
     // It deletes some queried Sprint__cs using <samp class="codeph apex_code">Database.<span class="statement">delete</span></samp> 
     // with a false second parameter to allow partial processing of records on failure.
     // Next, it iterates through the results to determine whether the operation was successful or not
     // for each record. and check if delete Sprint__c successful so print msg on debug, 
     // else add error message to oErrorMsg List and return the list  
     Database.DeleteResult[] DR_Dels = Database.delete(lstDeleteRec, false);
     // Iterate through each returned result
     for (Database.DeleteResult dr: DR_Dels) {
      if (dr.isSuccess()) {
         system.debug('successful delete Sprint__c');
        // Operation was successful
      } else {
       // Operation failed, so get all errors   
       oErrorMsg.add('');
       for (Database.Error err: dr.getErrors()) {
        // add Error message to oErrorMsg list and return the list
        oErrorMsg.add(err.getStatusCode() + ': ' + err.getMessage());
       }
      }
     }
     return oErrorMsg;
    
    }
  
    
  // method for update records after inline editing  
    @AuraEnabled
    public static List < Sprint__c > saveAccount(List<Sprint__c> lstAccount) {
        update lstAccount;
        return lstAccount;
    }
    
  // method for fetch picklist values dynamic  
    @AuraEnabled
    public static List < String > getselectOptions(sObject objObject, string fld) {
        system.debug('objObject --->' + objObject);
        system.debug('fld --->' + fld);
        List < String > allOpts = new list < String > ();
        // Get the object type of the SObject.
        Schema.sObjectType objType = objObject.getSObjectType();
        
        // Describe the SObject using its object type.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        
        // Get a map of fields for the SObject
        map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
        
        // Get the list of picklist values for this field.
        list < Schema.PicklistEntry > values =
            fieldMap.get(fld).getDescribe().getPickListValues();
        
        // Add these values to the selectoption list.
        for (Schema.PicklistEntry a: values) {
            allOpts.add(a.getValue());
        }
        system.debug('allOpts ---->' + allOpts);
        allOpts.sort();
        return allOpts;
    }
    @AuraEnabled
 public static List < Sprint__c > fetchAccount(String searchKeyWord) {
  String searchKey = searchKeyWord + '%';
  List < Sprint__c > returnList = new List < Sprint__c > ();
  List < Sprint__c > lstOfAccount = [SELECT Name, Description_Sprint__c, date_debut__c, date_fin__c,priorite__c, Etat__c From Sprint__c  where Name LIKE: searchKey LIMIT 50];
  for (Sprint__c acc: lstOfAccount) {
   returnList.add(acc);
  }
  return returnList;
      }
      @AuraEnabled
      public static list<Sprint__c> updateConRecords(List<Sprint__c> condata)
      {
          try
          {
              update condata;
          }
          catch(Exception e)
          {
              System.debug('unable to update the record due to '+e.getMessage());
          }
          return condata;
      }
      public String selectedVal{get;set;} 

      public list<selectOption> getProductnames()
      {
        list<selectOption> soList = new list<selectOption>();
        for(Sprint__c prod : [Select Id, Name from Sprint__c LIMIT 1000])
              soList .add(new selectOption(prod.id, Prod.Name));
        return soList;
      }
      @AuraEnabled 
    public static List<SObject> getSobject(String objName){
        String queryStr='select Id,Name from ' + objName;
        System.debug('queryStr'+queryStr);
        List<Sobject> results=Database.query(queryStr);
        System.debug('results'+results);
        return results ;
    }
      }
