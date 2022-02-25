var screenNumber;
function returnText()
{
  return text;
}
onEvent("StartMenu", "click", function(event) {
  console.log("StartMenu clicked!");
  //Fade menu once the button is clicked
  for (var i = 1; i > 0; i-=.0005)
  {
    setProperty("Label","text-color", rgb(251,244,244,i));
    setProperty("startButton", "text-color", rgb(255, 255, 255, i));
    setProperty("startButton", "background-color", rgb(26, 188, 156, i));
  }
  setScreen("UserName");
  screenNumber = 1;
});
var userColor;
var text = new Array();
//If username is equal to the id
//Add player if they are new.
var userName; 
var userId = getUserId();
//Sets username
onEvent("submit_button", "click", function(event) {
  console.log("submit_button clicked!");
  if (getText("userNameId") === "" || !containsNoLetter(getText("userNameId").toUpperCase()))
  {
    setText("userNameId","");
  setProperty("userNameId","placeholder", "Invalid username");
  }
  else if(getText("userNameId").length <= 2)
  {
   setText("userNameId","");
    setProperty("userNameId","placeholder", "Username too short");
  }
  else 
  {
    userName = getText("userNameId");
    console.log(getUserId());
    setScreen("colorChoose");
    screenNumber = 2;
  }
});
/*
When the user submits text, this event handler will take the value from the 
text input box and create a chat log with it
It then clears out the input box
*/
onEvent("ChatInput", "keydown", function(event)
{
  console.log(event.key);
  if(event.key =="Enter")
  {
   var temp = getText("ChatInput");
   if (temp == "")
   setProperty("ChatInput","placeholder","Type something...");
   else if (temp.length > 0 && containsNoLetter(temp.toUpperCase()))
   {
  setText("ChatInput", "");
  createRecord("Chat Logs",{Chats: temp, userId:getUserId(),UserName:userName, textColor:userColor}, function(record)
  {
   //We need to display the most recent chat that was stored to the user.
  });
  }
  }
});
onEvent("sendButton", "click", function(event) {
  console.log("sendButton clicked!");
  var temp = getText("ChatInput");
  if (temp == "" || !containsNoLetter(temp.toUpperCase()))
   setProperty("ChatInput","placeholder","Type something...");
   if(temp.length > 0 && containsNoLetter(temp.toUpperCase()))
   {
  setText("ChatInput", "");
  createRecord("Chat Logs",{Chats: temp, userId:getUserId(),UserName:userName, 
  textColor:userColor}, function(record)
  {
   //We need to display the most recent chat that was stored to the user.
  });
   }
  //Fix this below, we need to be able to show the most recent chat logged
  //That is not the user
  console.log(temp);
});
updateChat();
/*
New idea:
With onRecordEvent we can display the message everytime a log is created
Using conditional statements we can determine if it's either a the client
or another user.
Get our text within a textbox
Make a string with all the previous text
Status: Done
*/
/* 
New idea:
Custom text color for user
Status: Done
*/
function updateChat()
{
  onRecordEvent("Chat Logs", function(records,eventType)
  {
    if(eventType == 'create')
    {
      console.log("Chat log updated");
      if(records.UserName == userName && userId == records.userId)
      {
        add("You: " + records.Chats);
        appendText();
      }
    else
    {
      playSound("assets/category_digital/laser2.mp3");
      add(records.UserName + ": " + records.Chats);
      appendText();
    }
      }   
  }, false);
}
//Adds text to the text box, thus allowing the scroll bar
function appendText()
{
  var temp = "";
  setProperty("chat_box","text-color", userColor);
 for(var i = 0; i < text.length; i++)
 {
   temp += text[i] + "\n";
   setText("chat_box", temp);
 }
}
//Adds user submitted text in order for it get used
//by the appendText
function add(temp)
{
  appendItem(returnText(), temp);
}
//When the user chooses red as the preferred text color
onEvent("red", "click", function(event) {
  userColor = "red";
  fadeOut(userColor);
  console.log("red clicked!");
  screenNumber = 3;
});
//When the user chooses blue as the preferred text color
onEvent("blue", "click", function(event) {
  userColor = "blue";
  fadeOut(userColor);
  console.log("blue clicked!");
  screenNumber = 3;

});
//When the user chooses green as preferred text color
onEvent("green", "click", function(event) {
  userColor = "green";
  fadeOut(userColor);
  console.log("green clicked!");
  screenNumber = 3;

});
//When user chooses purple as preferred text color
onEvent("purple", "click", function(event) {
  userColor = "purple";
  fadeOut(userColor);
  screenNumber = 3;
  console.log("purple clicked!");
  
});
/*
This function is specifically for the color choosing menu
Each button has a set color and if the button is pressed
It will call this function and give chosen color as a parameter
This function then takes the RGB values of that given color has it fade from visible
to transparent
*/
function fadeOut(color)
{
  // use split method to remove commas on the colorID string and put them into an array
  //Each value gets assigned RGB and then we can fade it out
 var colorID = getProperty(color, "background-color");
 colorID = colorID.substring(4,14);
 console.log(colorID);
 var numbers = colorID.split(',');
 var RGBvalues =[];
 for (var i = 0; i < numbers.length; i++)
 appendItem(RGBvalues, parseInt(numbers[i]));
 for(var i = 0; i < RGBvalues.length; i++)
 console.log(RGBvalues[i]);
 for (var i = 1; i > 0; i-=.0005)
 setProperty(color,"background-color", rgb(RGBvalues[0],RGBvalues[1],RGBvalues[2],i));
 setScreen("ChatRoom");
}
function containsNoLetter(message)
{
  var alphabets = ["A","B","C","D","E","F","G","H","I",
  "J","K","L","M","N","O","P","Q","R","S","T",
  "U","V","W","X",
  "Y","Z"];
  for (var i = 0; i < alphabets.length; i++)
  {
    if (message.includes(alphabets[i]))
    return message.includes(alphabets[i]);
  }
  return false;
  
}