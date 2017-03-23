import * as force from './force';

export let findRunningUser = () => force.query(
	'SELECT Id, FirstName, LastName, Name, Email FROM User WHERE Id = \'' + force.getUserId() + '\' LIMIT 1');

export let findRecords = (limit: number) => force.query(
	'SELECT Id, CreatedDate, NewState__c, StateChangedBy__c FROM LockEvent__c ORDER BY CreatedDate DESC LIMIT ' + limit.toString());

export let create = (newState: string, changedBy: string) => force.create(
	'LockEvent__c',
	{NewState__c: newState, StateChangedBy__c: changedBy});