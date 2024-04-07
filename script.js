var itemArray;
$(document).ready(function(){
    console.log("Hello");
    $("#btn_add").on("click", function() {
        addItem();
      });
});


function addItem(){
// create new item
let listItem = $("<div>").addClass("list-group-item list-group-item-action d-flex gap-3 py-3").attr("aria-current", "true");
//add mouseover info about functions
listItem.attr("title","single click to mark done or undone.\nDouble click to delete");
listItem.addClass("deleteable");
// item style using bootsrap
let innerDiv = $("<div>").addClass("d-flex gap-2 w-100");

//get the input text from user
// the actual element text can be replaced  

let heading = $("<h6>").addClass("mb-0").text($("#textInput").val());
//heading.addClass("item");

//set up function
// Assemble
innerDiv.append(heading);
listItem.append(innerDiv);
let selectItem = listItem.appendTo( $(".list-group"));
selectItem.tooltip();
//clear up text in field
$("#textInput").val("");
itemSetUp(selectItem);
}

function itemSetUp(item){
//set up onclick
let clicked = false;
item.on("click",function(event){
  let elementTarget = event.target;
  clicked = !clicked;
  clicked ? elementTarget.style.textDecoration = "line-through" : elementTarget.style.textDecoration = "none";
});

//show remove comfirm diaglog
let dialogCreated = false;

item.on("dblclick",function(event){
  
  let $element = $(event.target);
  item.css("pointer-events","none");
  if(dialogCreated){
    //no need to create one more
  }else{
    let confirmDia = $("<div>").addClass("dialog").attr("id","confirm-dialog").attr("title","Remove this lineup?");
    let innerDiv = $("<p>", {
      "html": "<span class='ui-icon ui-icon-alert'></span> These items will be permanently deleted and cannot be recovered. Are you sure?",
    }).css({
      "float": "left",
      "margin": "12px 12px 20px 0"
    });
    //Assemble dialog and set up function
    confirmDia.append(innerDiv);
    $("body").append(confirmDia);
  }
 
  //generat dialog
 
  $("#confirm-dialog").dialog({
    resizable : false,
    height: "auto",
    width: 400,
    model: true,
    buttons :{
      "Delete":function () {      
        if(event.target.classList.contains("deleteable")){
          event.target.remove();
          $( this ).dialog( "close" );
          $("#confirm-dialog").remove();
        }else{
          //convert to jquery element          
          let $parentWithClass = $element.closest('.deleteable');
          $parentWithClass.remove();
          $( this ).dialog( "close" );
          $("#confirm-dialog").remove();
        }
        },
      Cancel: function () {
        $( this ).dialog( "close" );
        item.css("pointer-events","auto");
        dialogCreated = !dialogCreated;
        }
    }
  });
 

});
}