import * as force from './force';

let keyMasterVersion = '1.0';

export let findRunningUserAccessToken = () => force.query(
	'SELECT Passphrase__c FROM AccessToken__c WHERE User__c = \'' + force.getUserId() + '\' AND Expired__c = false LIMIT 1');

export let findRecords = (limit: number) => force.query(
	'SELECT Id, CreatedDate, NewState__c, StateChangedBy__c FROM LockEvent__c ORDER BY CreatedDate DESC LIMIT ' + limit.toString());

export let toggleLock = (newState: string, passphrase: string) => force.request({
        method: 'POST',
        contentType: 'application/json',
        path: '/services/apexrest/v' + keyMasterVersion + '/keymaster',
        params: {
        	newState: newState,
        	passphrase: passphrase
        }
    });