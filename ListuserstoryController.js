({
    loadContactList: function(component, event, helper) {
     // call the helper function for fetch contact from apex class 
     helper.onLoad(component, event);
    },
    
    // For count the selected checkboxes. 
    checkboxSelect: function(component, event, helper) {
     // get the selected checkbox value  
     var selectedRec = event.getSource().get("v.value");
     // get the selectedCount attrbute value(default is 0) for add/less numbers. 
     var getSelectedNumber = component.get("v.selectedCount");
     // check, if selected checkbox value is true then increment getSelectedNumber with 1 
     // else Decrement the getSelectedNumber with 1     
     if (selectedRec == true) {
      getSelectedNumber++;
     } else {
      getSelectedNumber--;
     }
     // set the actual value on selectedCount attribute to show on header part. 
     component.set("v.selectedCount", getSelectedNumber);
    },
 
    // For select all Checkboxes 
    selectAll: function(component, event, helper) {
     //get the header checkbox value  
     var selectedHeaderCheck = event.getSource().get("v.value");
     // get all checkbox on table with "boxPack" aura id (all iterate value have same Id)
     // return the List of all checkboxs element 
     var getAllId = component.find("boxPack");
     // If the local ID is unique[in single record case], find() returns the component. not array   
        if(! Array.isArray(getAllId)){
          if(selectedHeaderCheck == true){ 
             component.find("boxPack").set("v.value", true);
             component.set("v.selectedCount", 1);
          }else{
              component.find("boxPack").set("v.value", false);
              component.set("v.selectedCount", 0);
          }
        }else{
          // check if select all (header checkbox) is true then true all checkboxes on table in a for loop  
          // and set the all selected checkbox length in selectedCount attribute.
          // if value is false then make all checkboxes false in else part with play for loop 
          // and select count as 0 
           if (selectedHeaderCheck == true) {
           for (var i = 0; i < getAllId.length; i++) {
               component.find("boxPack")[i].set("v.value", true);
               component.set("v.selectedCount", getAllId.length);
           }
           } else {
             for (var i = 0; i < getAllId.length; i++) {
               component.find("boxPack")[i].set("v.value", false);
                   component.set("v.selectedCount", 0);
             }
          } 
        }  
    
    },
    //For Delete selected records 
    deleteSelected: function(component, event, helper) {
     // create var for store record id's for selected checkboxes  
     var delId = [];
     // get all checkboxes 
     var getAllId = component.find("boxPack");
     // If the local ID is unique[in single record case], find() returns the component. not array
        if(! Array.isArray(getAllId)){
            if (getAllId.get("v.value") == true) {
              delId.push(getAllId.get("v.text"));
            }
        }else{
        // play a for loop and check every checkbox values 
        // if value is checked(true) then add those Id (store in Text attribute on checkbox) in delId var.
        for (var i = 0; i < getAllId.length; i++) {
          if (getAllId[i].get("v.value") == true) {
            delId.push(getAllId[i].get("v.text"));
          }
         }
        } 
      
        // call the helper function and pass all selected record id's.    
         helper.deleteSelectedHelper(component, event, delId);
          
           
    },
    
      initRecords: function(component, event, helper) {
        // call the apex class method and fetch account list  
           var action = component.get("c.fetchAccount");
               action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                    console.log(JSON.stringify(storeResponse));
                 // set AccountList list with return value from server.
                    component.set("v.AccountList", storeResponse);
              }
          });
          $A.enqueueAction(action);
      },
      
      cancel : function(component,event,helper){
         // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
          $A.get('e.force:refreshView').fire(); 
      },
  
gotoURL:function(component,event,helper){
   component.set("v.isOpene", true);
       component.set('v.objToDo.priorite__c',0);
},
     closeModele: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
      component.set("v.isOpene", false);
   },
 
   likenClosee: function(component, event, helper) {
       
          component.set("v.isOpene", false);
        var objToDo = component.get("v.objToDo");
            objToDo.usertId = null ; 
            if(component.get("v.selectedLookUpRecorduser1").Id != undefined){
                objToDo.Sprint__c = component.get("v.selectedLookUpRecorduser1").Id;
                 //objToDo.Ressource__c = component.get("v.selectedLookUpRecorduser2").Id;
              } 
            //call saveTodoRecord server side method to save todo record
            var action = component.get("c.saveTodoRecord");
            action.setParams({
                toDoRecord : objToDo
               

            });
     
            action.setCallback(this,function(response){
                 
                var state = response.getState();
                if(state == "SUCCESS"){
                  component.set("v.isModalOpen", true);
                  helper.onLoad(component, event);
                        component.set("v.objToDo.Name","");
                    component.set("v.objToDo.description_userstory__c","");
                    component.set("v.objToDo.date_debut__c","");
                    component.set("v.objToDo.date_fin__c","");
                    component.set("v.objToDo.priorite__c","");
                    component.set("v.objToDo.etat__c","");
                }
                else{
                    //To handle server error
                    console.log('Error during saving '+state);
                }
            });
            $A.enqueueAction(action);      
        
   },
    gotoURLe:function(component,event,helper){
      component.set("v.isOpeneee", true);
       component.set('v.objToDoo.priorite__c',0);
    },
    closeModelee: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpeneee", false);
    },
    
    likenCloseee: function(component, event, helper) {
        
        component.set("v.isOpeneee", false);
        var objToDoo = component.get("v.objToDoo");
        objToDoo.usertId = null ; 
        if(component.get("v.selectedLookUpRecordeee").Id != undefined){
            objToDoo.User_Story__c = component.get("v.selectedLookUpRecordeee").Id;
            objToDoo.Ressource__c = component.get("v.selectedLookUpRecordeeee").Id;
        } 
        //call saveTodoRecord server side method to save todo record
        var action = component.get("c.saveTodoRecorde");
        action.setParams({
            toDoRecord : objToDoo
            
            
        });
     
        action.setCallback(this,function(response){
            var state = response.getState();
           if(state == "SUCCESS"){
                    component.set("v.isModalOpen3", true);
                    helper.onLoad(component, event);
               component.set("v.objToDoo.Name","");
                 component.set("v.objToDoo.desc_tache__c","");
                 component.set("v.objToDoo.date_debut__c","");
                 component.set("v.objToDoo.date_fin__c","");
                 component.set("v.objToDoo.Note__c","");
                 component.set("v.objToDoo.priorite__c","");
                 component.set("v.objToDoo.temp_estime__c","");
                 component.set("v.objToDoo.Etat__c","");
                }
                else{
                    //To handle server error
                    console.log('Error during saving '+state);
                }
            });
        $A.enqueueAction(action);         
        
    },


  Search: function(component, event, helper) {
      var searchField = component.find('searchField');
      var isValueMissing = searchField.get('v.validity').valueMissing;
      // if value is missing show error message and focus on field
      if(isValueMissing) {
          searchField.showHelpMessageIfInvalid();
          searchField.focus();
      }else{
        // else call helper function 
          helper.SearchHelper(component, event);
      }
  },
  doInit :function(component,event,helper){  
    // Apex method definition  
    var action = component.get("c.loadData");  
    // callbak function  
    action.setCallback(this,function(response){  
      //get state  
      var state = response.getState();  
      // check if state is 'SUCCESS'  
      if(state == 'SUCCESS'){  
        var result = response.getReturnValue();  
        //set value to "UnfilteredData" attaribute   
        component.set("v.UnfilteredData",result);  
        console.log(result);  
        // set value to "data" attaribute  
        component.set("v.data",result);  
      }else{  
        console.log('something bad happend! ');  
      }  
    });  
    // put the action into queue for server call.  
    $A.enqueueAction(action);  
  },  
  doFilter: function(component, event, helper) {  
    //calling helper  
    helper.FilterRecords(component);  
  },
 
 
   closeModel: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
      component.set("v.isOpen", false);
   },
 
  editprojet: function(component, event, helper) {
var RecordId = event.target.id;
var action = component.get("c.UpdateRecord");
action.setParams({ conid: RecordId });
action.setCallback(this, function(response){
if(response.getState()==="SUCCESS" && component.isValid()){
component.set("v.EditProjet",response.getReturnValue());
component.set("v.isOpen", true);
}
});

$A.enqueueAction(action);
},
    likenClose: function(component, event, helper) {
 var Recordid = component.find("InputId").get("v.value");
var Nameee = component.find("Namme").get("v.value");   
var desc = component.find("desc").get("v.value");
var datedebe = component.find("datedeb").get("v.value");
var datefine = component.find("datefin").get("v.value");
 var prioriteee = component.find("prioritte").get("v.value");
var etate = component.find("etatt").get("v.value");
var spriint = component.get("v.selectedLookUpRecordprojj").Id;
 var action = component.get("c.updateRecorduser");
 action.setParams({ "conid": Recordid,"Namee":Nameee,"deesc":desc,"date1":datedebe,"date2":datefine,"prioritee":prioriteee,"etaat":etate,"sprintt":spriint});

action.setCallback(this, function(a) {
           var state = a.getState();
       console.log('data '+state);
            if(state == "SUCCESS"){
                component.set("v.isModalOpen", true);
                  component.set("v.isOpen", false);
                   helper.onLoad(component, event);

            }
            else{
                //To handle server error
                console.log('Error during saving '+state);
            }
        });
        $A.enqueueAction(action); 
    },
   
    Init: function(component, event, helper) {
  helper.getAccountList(component, event);
},

handleBeforeSelect: function(component, event) {
  //Write your logic before select of any item
},

handleOnSelect: function(component, event) {
  //Write your logic on select of any item
},
     
   
    
            handleComponentEvent : function(component, event, helper) {	 
                var selectedAccountGetFromEvent = event.getParam("recordByEvent");
                 
                component.set("v.selectedLookUpRecord" , selectedAccountGetFromEvent); 
                 var forclose = component.find("lookup-pill");
                    $A.util.addClass(forclose, 'slds-show');
                    $A.util.removeClass(forclose, 'slds-hide');
           
                 var forclose = component.find("searchRes");
                    $A.util.addClass(forclose, 'slds-is-close');
                    $A.util.removeClass(forclose, 'slds-is-open');
                 
                 var lookUpTarget = component.find("lookupField");
                     $A.util.addClass(lookUpTarget, 'slds-hide');
                     $A.util.removeClass(lookUpTarget, 'slds-show');  
               
             },
             getSelectedValue: function(component,event,helper){
                 var selected = component.find('ProjectField').get('v.value');
                 component.set('v.objToDo.etat__c',selected);
             
                 },
      getSelectedValuee: function(component,event,helper){
                 var selected = component.find('ProjectFielde').get('v.value');
                 component.set('v.objToDoo.Etat__c',selected);
           
                 },
     getSelectedValueuser: function(component,event,helper){
            var selected = component.find('etatt').get('v.value');
            component.set('v.EditProjet.etat__c',selected);
    },
    handleConfirmDialog : function(component, event, helper) {
        component.set('v.showConfirmDialog', true);
    },
     
    handleConfirmDialogYes : function(component, event, helper) {
        console.log('Oui');
         var delId = [];
     // get all checkboxes 
     var getAllId = component.find("boxPack");
     // If the local ID is unique[in single record case], find() returns the component. not array
        if(! Array.isArray(getAllId)){
            if (getAllId.get("v.value") == true) {
              delId.push(getAllId.get("v.text"));
            }
        }else{
        // play a for loop and check every checkbox values 
        // if value is checked(true) then add those Id (store in Text attribute on checkbox) in delId var.
        for (var i = 0; i < getAllId.length; i++) {
          if (getAllId[i].get("v.value") == true) {
            delId.push(getAllId[i].get("v.text"));
          }
         }
        } 
      
        // call the helper function and pass all selected record id's.    
         helper.deleteSelectedHelper(component, event, delId);
          
           
        component.set('v.showConfirmDialog', false);
    },
     
    handleConfirmDialogNo : function(component, event, helper) {
        console.log('Nom');
        component.set('v.showConfirmDialog', false);
    },
    handleClick: function(component, event, helper) {
        const myEvent = component.getEvent('eightEvent');
        myEvent.fire();
  
    },
     detailuser:function(component,event,helper){
 
 const myEvent = component.getEvent('eightEvent');
        myEvent.fire();
  const myEvent2 = component.getEvent('detailuser1');
    myEvent2.fire();
     
  },
     closeModelsuccess: function(component, event, helper) {
      component.set("v.isModalOpen", false);
     },
     close: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpenn", false);
    },
    
      detailprojet2:function(component,event,helper){
        var RecordId = event.target.id;
        var action = component.get("c.showdetail");
         
        action.setParams({ "conid" : RecordId });
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS" && component.isValid()){
                component.set("v.isOpenn", true);
                component.set("v.ShowProjet",response.getReturnValue());         
            }
        });
        
        $A.enqueueAction(action);
         helper.gettacheList(component, event);
    },
    closeModelsuccess3: function(component, event, helper) {
       component.set("v.isModalOpen3", false);
            const myEvent = component.getEvent('eightEvent');
        myEvent.fire();
          const myEvent2 = component.getEvent('nineEvent');
        myEvent2.fire();
         component.set("v.hide",true);
   },  
})
