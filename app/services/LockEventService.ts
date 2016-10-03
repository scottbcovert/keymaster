import * as force from './force';

force.init({
    appId: '3MVG9szVa2RxsqBZLxJD1.on8bfUCqSzUK.wWBh8XEYyRBTLPOffcg1uxogIW9lDkgn5xn3sxlrzRstIipOKB',
    apiVersion: 'v37.0',
    oauthCallbackURL: 'http://localhost:8100/home'
});
force.login()

export let findAll = () => force.query(
	'SELECT Id, CreatedDate, NewState__c, StateChangedBy__c FROM LockEvent__c ORDER BY CreatedDate DESC LIMIT 20');

export let create = (newState: string, changedBy: string) => force.create(
	'LockEvent__c',
	{NewState__c: newState, StateChangedBy__c: changedBy});