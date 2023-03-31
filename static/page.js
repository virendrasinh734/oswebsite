headindexInput = document.getElementById("PID");
table = document.getElementById("table1");
let tableref = document.getElementById("tablecontainer");
let tableref1 = document.getElementById("tablecontainer1");
inpus = document.getElementById("inputcontainer");


//initialising the required variables and arrays
let entries=0;
let inputarr=[];
let page_faults = 0;
let array1 = [];
let hit=0;
let misshit=[];
let capacity =0;

//extracting the data from the page
function data_extractor(){
    for(let i=1;i<=entries;i++){
        let a1=parseInt(document.getElementById("table1").rows[i].cells[0].innerHTML);
        inputarr.push(a1);
    }
    console.log("This is the input array");
    console.log(inputarr);
}

//function to fix the input and display table
function Lock(){
    if(headindexInput.value != ""){
        headindexInput.disabled = true;
        tableref.style.transform="translateX(0rem)";
        tableref.style.opacity="100%";
    }
}
function UnLock(){
    
    if(headindexInput.disabled){
        tableref.style.transform="translateX(4rem)";
        tableref.style.opacity="0%";
        tableref1.style.transform="translateX(4rem)";
        tableref1.style.opacity="0%";
        headindexInput.disabled = false;
        headindexInput.value = null;
        data = [];
        DeleteAllRows();
        capacity = 0;
        document.getElementById("pageFaults").innerHTML="";
        document.getElementById("Tablediv").style.transform = "translateX(5rem)";
        document.getElementById("Tablediv").style.opacity = "0%";
        document.getElementById("pageFaults").style.transform = "scaleY(0%)";
    }
}
var data = [];
rowIndex = -1;

//function to insert the given page in the table
function InsertRow(){

    //condition to disallow empty values
    if(document.getElementById("pindex").value==""){
        alert("Cannot be empty");
        return;
    }
    rowIndex += 1;
    data[rowIndex] = document.getElementById("pindex").value;

    // 
    const tr=document.createElement('tr');
    const td1=document.createElement('td');
    td1.textContent=data[rowIndex];
    tr.appendChild(td1);
    table.appendChild(tr);
    entries+=1;
    document.getElementById("pindex").value = null;
}

//function to delete all rows which is used when reset is called
function DeleteAllRows(){
    for(let k=0;k<entries;k++){
        console.log(entries);
        document.getElementById("table1").deleteRow(1);
    }
    entries=0;
    inputarr=[];
    DeleteAllRowsFinalTable();
}

function DeleteAllRowsFinalTable(){
    for(i=0;i<capacity+1;i++){
        document.getElementById("final").deleteRow(1);
    }
    document.getElementById("final").deleteTHead();
}

//the main function for running the fifo algorithm
function Calculate(){
    tableref1.style.transform="translateX(0rem)";
    tableref1.style.opacity="100%";
    if(capacity>0){
        DeleteAllRowsFinalTable();
    }
    capacity=parseInt(document.getElementById("PID").value);
    console.log(capacity);
    data_extractor();
    // inputarr=[];
    page_faults = 0;
    document.getElementById("Tablediv").style.transform = "translateX(0rem)";
    document.getElementById("Tablediv").style.opacity = "100%";
    document.getElementById("pageFaults").style.transform = "scaleY(100%)";
    console.log(inputarr.length);
    console.log(capacity);
    CreateArray(inputarr.length, capacity);
    const inpp = {
        inputArrayy: inputarr,
        capacityy: capacity
      }
    //sending a fetch request to flask server with post method 
    fetch('/process-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //sending the data extracted using extractor to the flask server by making a json object
        body: JSON.stringify(inpp)
      })
      .then(response => response.json())

      .then(data => {
        //collecting the response recieved from flask and assigning values
            console.log(data["array1"]);
            console.log(data);
            array1=data["array1"];
            misshit=data["misshit"]
            page_faults=data["pagefaults"];
            hit=data["hits"]
            //function used to create and display final output
            CreateFinalTable();
            document.getElementById("pageFaults").innerHTML = "PAGE FAULTS: "+page_faults;
            // document.getElementById("missHit").innerHTML =  "MissHITS: "+misshit;
            // document.getElementById("answercontainer").style.transform = "scaleY(100%)";
            hit=0;
            array1 = [];
            misshit=[];
            page_faults = 0;
            inputarr=[];
      })
      .catch(error => console.error(error))
    
    console.log("array1 is: ")
    console.log(array1);
    
}

function CreateArray(l, c){
    for(i=0;i<l;i++){
        array1[i] = []
        for(j=0;j<c;j++){
            array1[i][j] = j;
        }
    }
    console.log(array1);
}


function CreateFinalTable(){
    
    //getting table from html
    let finalTable = document.getElementById("final");
    //creating thead and tbody
    let thead = finalTable.createTHead();
    let tbody = finalTable.createTBody();
    //creating header
    let theadrow = thead.insertRow();
    for(headerIndex=0;headerIndex<inputarr.length;headerIndex++){
        let th = document.createElement("th");
        let text = document.createTextNode("");
        try{
            text.nodeValue = inputarr[headerIndex];
        }
        catch{

        }
        th.appendChild(text);
        theadrow.appendChild(th);
    }
    //creating rows
    for(rowId=0;rowId<capacity;rowId++){
        let row = tbody.insertRow();
        //creating a row then setting the values of all columns
        for(columId=0;columId<inputarr.length;columId++){
            let td = document.createElement("td");
            let text = document.createTextNode("");
            try{
                text.nodeValue = array1[columId][rowId];
                console.log(array1[rowId][columId]);
            }
            catch{
                //keep the table cell empty in case of indexout of bounds in array
            }
            td.appendChild(text);
            row.appendChild(td);
        }
    }
    let tobdyrow = tbody.insertRow();
    for(columId=0;columId<inputarr.length;columId++){
        let td = document.createElement("td");
        td.style.backgroundColor = "red";
        let text = document.createTextNode(misshit[columId]);
        td.appendChild(text);
        tobdyrow.appendChild(td);
    }
    finalTable.style.transform = "scaleY(100%)";
    finalTable.scrollIntoView();
}