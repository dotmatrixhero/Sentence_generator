"use strict";

// Brian Park
// sentence-generator.js is a JavaScript application that works in conjunction
// with sentence-generator.html. It creates a box

(function() {
    var sentences = new Array();
    var toggledWords = [];
    $(document).ready(function() {

	if(localStorage['toggledWords']) {
	    toggledWords=JSON.parse(localStorage['toggledWords']);
	}
	$(".btn-group ul li a").click(chooseWord);
	$("#generate").click(generate);
	addSentences();
	
	// adds sentences to be options when a sentence is generated.
	function addSentences() {
	    sentences[0] = "James should {verb} the {adjective} {noun}.";
	    sentences[1] = "Waiter, this {noun} is simply {adjective}!";
	    sentences[2] = "Not today-tomorrow I shall {verb} the {adjective} {noun}!";
	    sentences[3] = "The {adjective} {noun} will {verb} the zookeeper.";
	    sentences[4] = "What kind of {noun} is this? Will it {verb} me?";

	}

	// changes the menu from "Select One!" to the chosen word.
	function chooseWord() {
	    $(this).parents("ul").prev().html($(this).html()
);
	}

	// chooses a random sentence and outputs it correctly.
	// also handles display of toggled words in the correct color.
	function generate() {
	    var spanClass = "<span class='inSent'>";
	    var spanClassColored = "<span class='inSent blue'>";
	    var noun = $("#nouns").html();
	    var adjective = $("#adjectives").html();
	    var verb = $("#verbs").html();
	    var f = Math.floor((Math.random()*sentences.length));
	    var sentence = sentences[f];
	    if(validateWord(verb) && validateWord(adjective) && 
	       validateWord(noun)) {
		if(toggledWords.indexOf(noun) < 0) {
		   sentence = sentence.replace("{noun}", spanClass
					       + noun +"</span>");
		}else{
		   sentence = sentence.replace("{noun}", spanClassColored
					       + noun +"</span>");
		}
		if(toggledWords.indexOf(adjective) < 0) {
		   sentence = sentence.replace("{adjective}", spanClass
					       + adjective + "</span>");
		}else{
		   sentence = sentence.replace("{adjective}", spanClassColored
					       + adjective + "</span>");
		    
		}
		if(toggledWords.indexOf(verb) < 0) {
		    sentence = sentence.replace("{verb}", spanClass
					       + verb + "</span>");
		}else{
		    sentence = sentence.replace("{verb}", spanClassColored
					       + verb + "</span>");			
		}
		$("#sentence").fadeOut( 200, function() {
		    $("#sentence").html(sentence);
		    $("#sentence").fadeIn("slow");
		    $(".inSent").click(toggle);
		});

		
	    }
	
	}
	
	// handles the toggling of a word (so it appears blue)
	// this data is stored in localStorage and is persistent.
	function toggle() {
	    var index = toggledWords.indexOf($(this).html());
	    if(index<0) {
		toggledWords.push($(this).html());
		$(this).attr("class","inSent blue");
	    }else{
		toggledWords.splice(index,1);
		$(this).attr("class","inSent");
	    }
	    localStorage['toggledWords']=JSON.stringify(toggledWords);
	}
	
	// prevents JS injection by verifying a word is valid.
	function validateWord(word) {
	    var patt = /[^a-zA-Z ]/i;
	    var replaceWord = word.replace(patt,"@");
	    if(replaceWord != word) {
		alert("Please select a word!");
		return false;
	    }
	    return true;
	}

    })



})();

