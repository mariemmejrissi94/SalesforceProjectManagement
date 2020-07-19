({
    onLoad: function(component, event) {
     console.log('onLoad call');
     //call apex class method
     var action = component.get('c.fetchuserstory');
     action.setCallback(this, function(response) {
      //store state of response
      var state = response.getState();
      if (state === "SUCCESS") {
       //set response value in ListOfContact attribute on component.
       component.set('v.ListOfContact', response.getReturnValue());
       // set deafult count and select all checkbox value to false on load 
       component.set("v.selectedCount", 0);
       component.find("box3").set("v.value", false);
      }
     });
     $A.enqueueAction(action);
    },
    
    deleteSelectedHelper: function(component, event, deleteRecordsIds) {
     //call apex class method
     var action = component.get('c.deleteRecords');
     // pass the all selected record's Id's to apex method 
     action.setParams({
      "lstRecordId": deleteRecordsIds
     });
     action.setCallback(this, function(response) {
        //store state of response
        var state = response.getState();
        if (state === "SUCCESS") {
         console.log(state);
         if (response.getReturnValue() != '') {
          // if getting any error while delete the records , then display a alert msg/
          alert('The following error has occurred. while Delete record-->' + response.getReturnValue());
          
         }
       // call the onLoad function for refresh the List view 
       component.set("v.isModalOpen", true);   
       this.onLoad(component, event);
       
      
      }
     });
     $A.enqueueAction(action);
    },
    requiredValidation : function(component,event) {
        // get all accounts.. 	
        var allRecords = component.get("v.AccountList");
        var isValid = true;
        // play a for loop on all account list and check that account name is not null,   
        for(var i = 0; i < allRecords.length;i++){
            if(allRecords[i].Name == null || allRecords[i].Name.trim() == ''){
                alert('Complete this field : Row No ' + (i+1) + ' Name is null' );
                isValid = false;
            }  
        }
        return isValid;
    },
    SearchHelper: function(component, event) {
        // show spinner message
         component.find("Id_spinner").set("v.class" , 'slds-show');
        var action = component.get("c.fetchAccount");
        action.setParams({
            'searchKeyWord': component.get("v.searchKeyword")
        });
        action.setCallback(this, function(response) {
           // hide spinner when response coming from server 
            component.find("Id_spinner").set("v.class" , 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                
                // if storeResponse size is 0 ,display no record found message on screen.
                if (storeResponse.length == 0) {
                    component.set("v.Message", true);
                } else {
                    component.set("v.Message", false);
                }
                
                // set numberOfRecord attribute value with length of return value from server
                component.set("v.TotalNumberOfRecord", storeResponse.length);
                
                // set searchResult list with return value from server.
                component.set("v.searchResult", storeResponse); 
                
            }else if (state === "INCOMPLETE") {
                alert('Response is Incompleted');
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    FilterRecords: function(component) {  
        //data showing in table  
        var data = component.get("v.ListOfContact");  
        // all data featched from apex when component loaded  
        var allData = component.get("v.UnfilteredData");  
        //Search tems  
        var searchKey = component.get("v.filter");  
        // check is data is not undefined and its lenght is greater than 0  
        if(data!=undefined || data.length>0){  
          // filter method create a new array tha pass the test (provided as function)  
          var filtereddata = allData.filter(word => (!searchKey) || word.Name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1);  
          console.log('** '+filtereddata);  
        }  
        // set new filtered array value to data showing in the table.  
        component.set("v.ListOfContact", filtereddata);  
        // check if searchKey is blank  
        if(searchKey==''){  
          // set unfiltered data to data in the table.  
          component.set("v.ListOfContact",component.get("v.UnfilteredData"));  
        }  
      },
      getAccountList: function(component, event) {
        var action = component.get("c.fetchsprint");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.sprint", result);
            }
        });
        $A.enqueueAction(action);
    },
     gettacheList: function(component, event) {
           var RecordId = event.target.id;
         console.log('RecordId in sprints++ ',RecordId);
        var action = component.get("c.showtache");
          action.setParams({ "conid" : RecordId });
        action.setCallback(this, function(response) {
            if(response.getState()==="SUCCESS" && component.isValid()){
                component.set("v.tache",response.getReturnValue());
                
           
            }
        });
        $A.enqueueAction(action);
    },
})
