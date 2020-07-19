({
	doInit : function(component, event, helper) {
        
	},
  
//home scrummaster
	handleFirstEvent: function(component, event, helper) {
		const username = event.getParam('username');
		component.set('v.isLoggedIn', true);
		component.set('v.username', username);
	},

	handleSecondEvent: function(component, event, helper) {
		component.set('v.isLoggedIn', false);
		component.set('v.username', null);
        
	},
//home developer
     
    handledevEvent: function(component, event, helper) {
		const username = event.getParam('username');
		component.set('v.isLoggedIn2', true);
		component.set('v.username', username);
	},

	handledev2Event: function(component, event, helper) {
		component.set('v.isLoggedIn2', false);
		component.set('v.username', null);
        
	},
    //home owner
     handleownerEvent: function(component, event, helper) {
		const username = event.getParam('username');
		component.set('v.isLoggedIn3', true);
		component.set('v.username', username);
	},

	handleowner2Event: function(component, event, helper) {
		component.set('v.isLoggedIn3', false);
		component.set('v.username', null);
        
	},
    handlethreeEvent: function(component, event, helper) {
		
		component.set('v.listprojet', true);
		component.set('v.username',false);
	},

	handlefourEvent: function(component, event, helper) {
		component.set('v.listprojet', false);
		component.set('v.username', null);
	},
     handlefiveEvent: function(component, event, helper) {
		
		component.set('v.listsprint', true);
		component.set('v.username',false);
	},

	handlesixEvent: function(component, event, helper) {
		component.set('v.listsprint', false);
		component.set('v.username', null);
	},
       handlesprintownerEvent: function(component, event, helper) {
		
		component.set('v.listsprint2', true);
		component.set('v.username',false);
	},

	  handlesprintownerEvent2: function(component, event, helper) {
		component.set('v.listsprint2', false);
		component.set('v.username', null);
	},
  
      handlesevenEvent: function(component, event, helper) {
		
		component.set('v.listuser', true);
		component.set('v.username',false);
	},

	handleeightEvent: function(component, event, helper) {
		component.set('v.listuser', false);
		component.set('v.username', null);
	},
    handlesnineEvent: function(component, event, helper) {
		
		component.set('v.listtache', true);
		component.set('v.username',false);
	},

	handletenEvent: function(component, event, helper) {
		component.set('v.listtache', false);
		component.set('v.username', null);
	},
     handlelisttacheowner1Event: function(component, event, helper) {
		
		component.set('v.listtacheowner', true);
		component.set('v.username',false);
	},

	handlelisttacheowner2Event: function(component, event, helper) {
		component.set('v.listtacheowner', false);
		component.set('v.username', null);
	},
     handlelisttachedeveloper1Event: function(component, event, helper) {
		
		component.set('v.listtachedeveloper', true);
		component.set('v.username',false);
	},

	handlelisttachedeveloper2Event: function(component, event, helper) {
		component.set('v.listtachedeveloper', false);
		component.set('v.username', null);
	},
    handleselevenEvent: function(component, event, helper) {
		
		component.set('v.liststache', true);
		component.set('v.username',false);
	},

	handletwelveEvent: function(component, event, helper) {
		component.set('v.liststache', false);
		component.set('v.username', null);
	},
     handlethirteenEvent: function(component, event, helper) {
		
		component.set('v.liststat', true);
		component.set('v.username',false);
	},

	fourteenEvent: function(component, event, helper) {
		component.set('v.liststat', false);
		component.set('v.username', null);
	},
    dashowner1Event: function(component, event, helper) {
		
		component.set('v.dashowner', true);
		component.set('v.username',false);
	},

	dashowner2Event: function(component, event, helper) {
		component.set('v.dashowner', false);
		component.set('v.username', null);
	},
     handledetailprojet1: function(component, event, helper) {
		
		component.set('v.detailProjet', true);
		component.set('v.username',false);
	},

	handledetailprojet2: function(component, event, helper) {
		component.set('v.detailProjet', false);
		component.set('v.username', null);
	},
     handledetailsprint1: function(component, event, helper) {
		
		component.set('v.detailsprint', true);
		component.set('v.username',false);
	},

	handledetailsprint2: function(component, event, helper) {
		component.set('v.detailsprint', false);
		component.set('v.username', null);
	},
    handledetailuser1: function(component, event, helper) {
		
		component.set('v.detailuser', true);
		component.set('v.username',false);
	},

	handledetailuser2: function(component, event, helper) {
		component.set('v.detailuser', false);
		component.set('v.username', null);
	},
    handledetailtache1: function(component, event, helper) {
		
		component.set('v.detailtache', true);
		component.set('v.username',false);
	},

	handledetailtache2: function(component, event, helper) {
		component.set('v.detailtache', false);
		component.set('v.username', null);
	},
 handledetailsoutache1: function(component, event, helper) {
		
		component.set('v.detailsoutache', true);
		component.set('v.username',false);
	},

	handledetailsoutache2: function(component, event, helper) {
		component.set('v.detailsoutache', false);
		component.set('v.username', null);
	},
    handledetailkanban1: function(component, event, helper) {
		
		component.set('v.kanban', true);
		component.set('v.username',false);
	},

	handledetailkanban2: function(component, event, helper) {
		component.set('v.kanban', false);
		component.set('v.username', null);
	},
    handledetailcalendar1: function(component, event, helper) {
		
		component.set('v.calendar', true);
		component.set('v.username',false);
	},

	handledetailcalendar2: function(component, event, helper) {
		component.set('v.calendar', false);
		component.set('v.username', null);
	},
 
    
})
