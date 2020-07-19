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
        component.set("v.selectedCount", getSelectedNumber);
    },
    
    // For select all Checkboxes 
    selectAll: function(component, event, helper) {
        var selectedHeaderCheck = event.getSource().get("v.value");
     
        var getAllId = component.find("boxPack");
        if(! Array.isArray(getAllId)){
            if(selectedHeaderCheck == true){ 
                component.find("boxPack").set("v.value", true);
                component.set("v.selectedCount", 1);
            }else{
                component.find("boxPack").set("v.value", false);
                component.set("v.selectedCount", 0);
            }
        }else{
         
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
 
    gotoURL:function(component,event,helper){
        component.set("v.isOpene", true);
    },
    closeModele: function(component, event, helper) {
        component.set("v.isOpene", false);
    },
    
    likenClosee: function(component, event, helper) {
        
        component.set("v.isOpene", false);
        var objToDo = component.get("v.objToDo");
        objToDo.usertId = null ; 
        if(component.get("v.selectedLookUpRecord").Id != undefined){
            objToDo.Ressource__c = component.get("v.selectedLookUpRecord").Id;
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
            }
            else{
                //To handle server error
                console.log('Error during saving '+state);
            }
        });
        $A.enqueueAction(action);         
        
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
    
    gotoURLe:function(component,event,helper){
        component.set("v.isOpenee", true);
        component.set('v.objToDoo.priorite__c',0);
       
    },
    closeModelee: function(component, event, helper) {
     
        component.set("v.isOpenee", false);
    },
    
    likenCloseee: function(component, event, helper) {
        
        component.set("v.isOpenee", false);
        var objToDoo = component.get("v.objToDoo");
        objToDoo.usertId = null ; 
        if(component.get("v.selectedLookUpRecord").Id != undefined){
            objToDoo.Projet__c = component.get("v.selectedLookUpRecord").Id;
            //objToDoo.Ressource__c = component.get("v.selectedLookUpRecorde").Id;
        } 
        var action = component.get("c.saveTodoRecorde");
        action.setParams({
            toDoRecord : objToDoo
            
            
        });
        
        action.setCallback(this,function(response){
            var state = response.getState();
            
            if(state === "SUCCESS"){
                component.set("v.isModalOpen3", true);

                     helper.onLoad(component, event);
                component.set("v.objToDoo.Name","");
                    component.set("v.objToDoo.description_sprint__c","");
                    component.set("v.objToDoo.date_debut__c","");
                    component.set("v.objToDoo.date_fin__c","");
                    component.set("v.objToDoo.priorite__c","");
                    component.set("v.objToDoo.Etat__c","");
                
           
                
                
            }
            else{
                var errors = response.getError(); 
               
                
              component.set("v.isModalOpen2", true);
              
                component.set("v.errorMessage",errors.message); 
                
                
                 
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
    
    detailprojet:function(component,event,helper){
        //const myEvent = component.getEvent('fourEvent');
        //myEvent.fire();
        /*const myEvent2 = component.getEvent('detailprojet1');
        myEvent2.fire();
        
       var RecordId = event.target.id;
        console.log('RecordId '+RecordId);
        
        //const myEvent2 = component.getEvent('detailprojet');
        var evt = $A.get("e.c:MyEvent2");
        console.log('evt '+evt);
        evt.setParams({
            "recId" : RecordId,
            "hide":true
        })
        alert('Event Fired');
        evt.fire();
        */
          const myEvent = component.getEvent('fourEvent');
        myEvent.fire();
        const myEvent2 = component.getEvent('detailprojet1');
        myEvent2.fire();
          component.set("v.hide", true);
    },
    
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
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
         helper.getSprintList(component, event);
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
        var Namee = component.find("InputName").get("v.value");   
        var desc = component.find("Inputdesc").get("v.value");
        var datedebe = component.find("Inputdatedeb").get("v.value");
        var datefine = component.find("Inputdatefin").get("v.value");
        var etate = component.find("Inputetat").get("v.value");
         var ressource = component.get("v.selectedLookUpRecorduser").Id;
        var action = component.get("c.updateRecordProjet");
        action.setParams({ "conid": Recordid,"Naame":Namee,"deesc":desc,"date1":datedebe,"date2":datefine,"etaat":etate,"responsable":ressource});
        action.setCallback(this, function(a) {
            var state = a.getState();
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
    getSelectedValue: function(component,event,helper){
        var selected = component.find('Inputetat').get('v.value');
        component.set('v.objToDo.Etat__c',selected);
        //alert(selected);
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
    getSelectedValues: function(component,event,helper){
        var selected = component.find('ProjectFielde').get('v.value');
        component.set('v.objToDoo.Etat__c',selected);
        //alert(selected);
    },
    handleClick: function(component, event, helper) {
         const myEvent = component.getEvent('fourEvent');
        //var myEvent = $A.get("e.c:MyEvent2");
        myEvent.fire();
        
    },
      closeModelsuccess: function(component, event, helper) {
      component.set("v.isModalOpen", false);
   },
      closeModelsuccess3: function(component, event, helper) {
       component.set("v.isModalOpen3", false);
            const myEvent = component.getEvent('fourEvent');
        myEvent.fire();
          const myEvent2 = component.getEvent('fiveEvent');
        myEvent2.fire();
         component.set("v.hide",true);
   },
     closeModelerror: function(component, event, helper) {
      component.set("v.isModalOpen2", false);
   },
    gotocalendar: function(component, event, helper) {
      const myEvent = component.getEvent('fourEvent');
        myEvent.fire();
        const myEvent2 = component.getEvent('calendar1');
        myEvent2.fire();
    }
})
