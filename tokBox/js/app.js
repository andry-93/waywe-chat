// replace these values with those generated in your TokBox Account
var apiKey = "46747142";
var sessionId = "1_MX40Njc0NzE0Mn5-MTU4OTg5ODA4MjM5N34yNHcvNFo2cTI4VkVmMHQ5TGk1b3JUeit-fg";
var token = "T1==cGFydG5lcl9pZD00Njc0NzE0MiZzaWc9Nzg1MjE2ZDA2ZTZmZjk1ZmRkNjVlMzYwZmIxYTA1NWViZjA1NmEyNDpzZXNzaW9uX2lkPTFfTVg0ME5qYzBOekUwTW41LU1UVTRPVGc1T0RBNE1qTTVOMzR5Tkhjdk5GbzJjVEk0VmtWbU1IUTVUR2sxYjNKVWVpdC1mZyZjcmVhdGVfdGltZT0xNTg5ODk4MjU2Jm5vbmNlPTAuMTcxMDM5Mzg2NTc2Mzg4NCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTkyNDkwMjU1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// Handling all of our errors here by alerting them
function handleError(error) {
	if (error) {
		alert(error.message);
	}
}

// (optional) add server code here
initializeSession();

function initializeSession() {
	var session = OT.initSession(apiKey, sessionId);

	// Subscribe to a newly created stream
	session.on('streamCreated', function (event) {
		session.subscribe(event.stream, 'subscriber', {
			insertMode: 'append',
			width: '100%',
			height: '100%'
		}, handleError);
	});

	// Create a publisher
	var publisher = OT.initPublisher('publisher', {
		insertMode: 'append',
		width: '100%',
		height: '100%'
	}, handleError);

	// Connect to the session
	session.connect(token, function (error) {
		// If the connection is successful, publish to the session
		if (error) {
			handleError(error);
		} else {
			session.publish(publisher, handleError);
		}
	});
}
