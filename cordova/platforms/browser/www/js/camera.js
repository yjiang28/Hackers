/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var appClarifai;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

/*
 * camera.js
 * Clarifai Basic Application demo code
 * You can reference Clarifai's JavaScript library to
 * complete this demo available at
 * https://github.com/Clarifai/clarifai-javascript
 */
(function ($, Clarifai) {
	$(document).ready(function () {
		initialize()
	})

	// Finding a bunch of elements in the DOM
	var app = $(".app")
	var image = $("#image");
	var tagsContainer = $(".tags-container");
	var tags = $(".tags")

	/*
	 * displayTag
	 * functionality to display the tag with classes and probabilities
	 * contains some functionality regarding the response manipulation
	 */
	function displayTag (response) {
		console.log("Clarifai Response!");
		console.log(response);

		/*
		 * an array of resultant images is received
		 * in this case we only request one
		 * so we just need to get the first one
		 */
		var image 	= 	response.results[0];

		// Image has a further tag that contains classes, concept_ids and
		// probabilities for each concept
		var tag 	= 	image.result.tag;
		var word = tag["classes"][0];

		// Looping through all the classes in the tag using map
		// to get the html for each concept
		var concepts = tag.classes.slice(0,1).map(function (value) {
			// adding class and concept information
			return `<h3>${value}</h3>`;
		});

		// joining all the stuff generated and throwing the html into .tags
		tags.html(concepts.join(""));

		// displaying the hidden container
		tagsContainer.show()
	}


	// function to initialize the keys
	function initialize () {
		// getting the credential through calling getKeys()
		// which is available in Global scope because of keys.js
		var keys = getKeys() || {}

		var clientId = keys["CLARIFAI_CLIENT_ID"]
		var clientSecret = keys["CLARIFAI_CLIENT_SECRET"]

		if (!clientId || !clientSecret) {
			app.html("Enter your Clarifai's Client ID and Client Secret in order to successfully run this demo. Go to developer.clarifai.com, sign up and create your application if you haven't already. You'll have to edit keys.js file to enter your credentials")
		}
		else {
            appClarifai = new Clarifai.App(
                clientId,
                clientSecret
            );
		}
	}



    Webcam.attach('#myCamera');

	$("#takeSnapshot").on("click",function() {
        take_snapshot();
	});
    function take_snapshot() {
        Webcam.snap( function(data_uri) {
            appClarifai.models.predict(Clarifai.GENERAL_MODEL, {base64: data_uri.replace(/^data\:image\/\w+\;base64\,/, '')}).then(
                function(response) {
                    var word = response.data.outputs[0].data.concepts[0].name;
                    document.getElementById("print").innerHTML = word;
                    tts(null, word);
                },
                function(err) {
                    console.log(err);
                }
            );
        });
    }



}(jQuery, Clarifai));
