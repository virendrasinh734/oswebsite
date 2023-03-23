headindexInput = document.getElementById("PID");
table = document.getElementById("table1");
inpus = document.getElementById("sfsInput");
look = document.getElementById("look");
clook = document.getElementById("clook");
left = document.getElementById("left");
right = document.getElementById("right");
let entries=0;
let inputarr=[];
let page_faults = 0;
let array1 = [];
let hit=0;
let misshit=[];

function data_extractor(){
    for(let i=1;i<=entries;i++){
        let a1=parseInt(document.getElementById("table1").rows[i].cells[0].innerHTML);
        inputarr.push(a1);
    }
    console.log("This is the input array");
    console.log(inputarr);
}

function eLock(){
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
        document.getElementById("myPlot").innerHTML = "";
        document.getElementById("tot").innerHTML="";
        document.getElementById("seq").innerHTML="";
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
    inputarr=[]
}
function Calculate(){
    let capacity=parseInt(document.getElementById("PID").value)
    console.log(capacity)
    data_extractor();
    // inputarr=[];
    page_faults = 0;
    console.log(inputarr.length);
    console.log(capacity);
    CreateArray(inputarr.length, capacity);
    pageFaults(inputarr, inputarr.length, capacity);
    hit=0;
    array1 = [];
    misshit=[];
    page_faults = 0;
    inputarr=[];}

function CreateArray(l, c){
    for(i=0;i<l;i++){
        array1[i] = []
        for(j=0;j<c;j++){
            array1[i][j] = j;
        }
    }
    console.log(array1);
}
function pageFaults(pages, n, capacity)
    {

        let s = new Set();
        var a = []
      
        // To store the pages in FIFO manner
         var indexes = [];
      
        // Start from initial page
        let page_faults = 0;
        for (let i=0; i<n; i++)
        {
            // Check if the set can hold more pages
            if (s.size < capacity)
            {
                if (!s.has(pages[i]))
                {
                    s.add(pages[i]);
      
                    // increment page fault
                    page_faults++;
      
                    // Push the current page into the queue
                    indexes.push(pages[i]);
                    array1[i] = Array.from(s);
                    misshit.push("miss");
                }
                else
                {
                    array1[i] = Array.from(s);
                    hit++;
                    if(indexes[0] == pages[i]){
                    indexes.shift();
                    indexes.push(pages[i]);
                    }
                    else{
                        for(let j=0;j<indexes.length;j++){
                            if(indexes[j] == pages[i]){
                                indexes.splice(j,1);
                                indexes.push(pages[i]);
                            }
                        }
                    }
                    misshit.push("hit");
                }
            }
      
            // If the set is full then need to perform FIFO
            // i.e. remove the first page of the queue from
            // set and queue both and insert the current page
            else
            {
                // Check if current page is not already
                // present in the set
                if (!s.has(pages[i]))
                {
                    //Pop the first page from the queue
                    let val = indexes[0];
      
                    indexes.shift();
      
                    // Remove the indexes page
                    s.delete(val);
      
                    // insert the current page
                    s.add(pages[i]);
      
                    // push the current page into
                    // the queue
                    indexes.push(pages[i]);
      
                    // Increment page faults
                    page_faults++;
                    array1[i] = Array.from(s);
                    misshit.push("miss");
                }
                else
                {
                    hit++;
                    array1[i] = Array.from(s);
                    if(indexes[0] == pages[i]){
                        indexes.shift();
                        indexes.push(pages[i]);
                        }
                        else{
                            for(let j=0;j<indexes.length;j++){
                                if(indexes[j] == pages[i]){
                                    indexes.splice(j,1);
                                    indexes.push(pages[i]);
                                }
                            }
                        }
                    misshit.push("hit");
                }
            }
        }
        console.log(array1);
        console.log(page_faults);
        console.log(hit);
        console.log(misshit);
    }