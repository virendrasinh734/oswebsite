headindexInput = document.getElementById("PID");
table = document.getElementById("table1");
inpus = document.getElementById("sfsInput");
// look = document.getElementById("look");
// clook = document.getElementById("clook");
// left = document.getElementById("left");
// right = document.getElementById("right");
let entries=0;
let inputarr=[];
let page_faults = 0;
let array1 = [];
let hit=0;
let misshit=[];
let capacity =0;
function data_extractor(){
    for(let i=1;i<=entries;i++){
        let a1=parseInt(document.getElementById("table1").rows[i].cells[0].innerHTML);
        inputarr.push(a1);
    }
    console.log("This is the input array");
    console.log(inputarr);
}

function Lock(){
    if(headindexInput.value != ""){
        headindexInput.disabled = true;
        table.style.transform = "scaleY(100%)";
        inpus.style.transform = "scaleY(100%)";
        document.getElementById("caldiv").style.display = "flex";
    }
}
function UnLock(){
    
    if(headindexInput.disabled){
        table.style.transform = "scaleY(0%)";
        inpus.style.transform = "scaleY(0%)";
        document.getElementById("caldiv").style.display = "none";
        headindexInput.disabled = false;
        headindexInput.value = null;
        data = [];
        DeleteAllRows();
        capacity = 0;
        document.getElementById("pageFaults").innerHTML="";
        document.getElementById("missHit").innerHTML="";
        document.getElementById("final").style.transform = "scaleY(0%)";
        document.getElementById("answercontainer").style.transform = "scaleY(0%)";
    }
}
var data = [];
rowIndex = -1;
function InsertRow(){
    // for(let j=0 ; j<data.length ; j++){
    //     if(data[j] == document.getElementById("pindex").value){
    //         alert("Duplicate Entry");
    //         return;
    //     }
    // }
    rowIndex += 1;
    data[rowIndex] = document.getElementById("pindex").value;

    // data[rowIndex][0] = document.getElementById("pindex").value;
    //test case not checked(if negative values or not)
    // document.getElementById("pid").value = null;
    const tr=document.createElement('tr');
    const td1=document.createElement('td');
    td1.textContent=data[rowIndex];
    tr.appendChild(td1);
    table.appendChild(tr);
    entries+=1;
    document.getElementById("pindex").value = null;
}
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
    for(i=0;i<capacity;i++){
        document.getElementById("final").deleteRow(1);
    }
    document.getElementById("final").deleteTHead();
}
function Calculate(){
    if(capacity>0){
        DeleteAllRowsFinalTable();
    }
    capacity=parseInt(document.getElementById("PID").value);
    console.log(capacity);
    data_extractor();
    // inputarr=[];
    page_faults = 0;
    console.log(inputarr.length);
    console.log(capacity);
    CreateArray(inputarr.length, capacity);
    const inpp = {
        inputArrayy: inputarr,
        capacityy: capacity
      }
    fetch('/process-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inpp)
      })
      .then(response => response.json())
      .then(data => {
            console.log(data["array1"]);
            console.log(data);
            array1=data["array1"];
            misshit=data["misshit"]
            page_faults=data["pagefaults"];
            hit=data["hits"]
            CreateFinalTable();
            document.getElementById("pageFaults").innerHTML = "PAGE FAULTS: "+page_faults;
            document.getElementById("missHit").innerHTML =  "MissHITS: "+misshit;
            document.getElementById("answercontainer").style.transform = "scaleY(100%)";
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
// function pageFaults(pages, n, capacity)
//     {

//         let s = new Set();
//         var a = []
      
//         // To store the pages in FIFO manner
//          var indexes = [];
      
//         // Start from initial page
//         let page_faults = 0;
//         for (let i=0; i<n; i++)
//         {
//             // Check if the set can hold more pages
//             if (s.size < capacity)
//             {
//                 if (!s.has(pages[i]))
//                 {
//                     s.add(pages[i]);
      
//                     // increment page fault
//                     page_faults++;
      
//                     // Push the current page into the queue
//                     indexes.push(pages[i]);
//                     array1[i] = Array.from(s);
//                     misshit.push("miss");
//                 }
//                 else
//                 {
//                     array1[i] = Array.from(s);
//                     hit++;
//                     if(indexes[0] == pages[i]){
//                     indexes.shift();
//                     indexes.push(pages[i]);
//                     }
//                     else{
//                         for(let j=0;j<indexes.length;j++){
//                             if(indexes[j] == pages[i]){
//                                 indexes.splice(j,1);
//                                 indexes.push(pages[i]);
//                             }
//                         }
//                     }
//                     misshit.push("hit");
//                 }
//             }
      
//             // If the set is full then need to perform FIFO
//             // i.e. remove the first page of the queue from
//             // set and queue both and insert the current page
//             else
//             {
//                 // Check if current page is not already
//                 // present in the set
//                 if (!s.has(pages[i]))
//                 {
//                     //Pop the first page from the queue
//                     let val = indexes[0];
      
//                     indexes.shift();
      
//                     // Remove the indexes page
//                     s.delete(val);
      
//                     // insert the current page
//                     s.add(pages[i]);
      
//                     // push the current page into
//                     // the queue
//                     indexes.push(pages[i]);
      
//                     // Increment page faults
//                     page_faults++;
//                     array1[i] = Array.from(s);
//                     misshit.push("miss");
//                 }
//                 else
//                 {
//                     hit++;
//                     array1[i] = Array.from(s);
//                     if(indexes[0] == pages[i]){
//                         indexes.shift();
//                         indexes.push(pages[i]);
//                         }
//                         else{
//                             for(let j=0;j<indexes.length;j++){
//                                 if(indexes[j] == pages[i]){
//                                     indexes.splice(j,1);
//                                     indexes.push(pages[i]);
//                                 }
//                             }
//                         }
//                     misshit.push("hit");
//                 }
//             }
//         }
//         console.log(array1);
//         console.log(page_faults);
//         console.log(hit);
//         console.log(misshit);
//         CreateFinalTable();
//         document.getElementById("pageFaults").innerHTML = "PAGE FAULTS: "+page_faults;
//         document.getElementById("missHit").innerHTML =  "MissHITS: "+misshit;
//         document.getElementById("answercontainer").style.transform = "scaleY(100%)";
//     }

function CreateFinalTable(){
    
    //getting table from html
    let finalTable = document.getElementById("final");
    //creating thead and tbody
    let thead = finalTable.createTHead();
    let tbody = finalTable.createTBody();
    //creating header
    let row = thead.insertRow();
    for(headerIndex=0;headerIndex<capacity+1;headerIndex++){
        let th = document.createElement("th");
        let text = document.createTextNode("");
        try{
            text.nodeValue = inputarr[headerIndex];
        }
        catch{
            
        }
        th.appendChild(text);
        row.appendChild(th);
    }
    //creating rows
    for(let rowId=0;rowId<capacity;rowId++){
        let row = tbody.insertRow();
        //creating a row then setting the values of all columns
        for(columId=0;columId<capacity+1;columId++){
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
    finalTable.style.transform = "scaleY(100%)";
    finalTable.scrollIntoView();
}
