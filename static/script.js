//current data array
let data = [0,0,0];
//raumdueeters
//creating an identifier for table 1 body
const t1=document.querySelector('#table1');
let pid=[];
let completed=[];
let entries=0; //process counter
var avgwt=0;
var avgta=0;
let extraarrayPID=[];
//------------------------------------------------------------------
function addrow(){
    //loading the current data(user input) into current data array
    data[0] = document.getElementById("PID").value;
    data[1] = document.getElementById("AT").value;
    data[2] = document.getElementById("BT").value;
    document.getElementById("PID").value = null;
    document.getElementById("AT").value = null;
    document.getElementById("BT").value = null;
    //------------------------------------------------------------------
    //input checker
    if(data[0]==""|| data[1]=="" || data[2]==""){
        alert("No field can empty");
        return;
    }
    console.log(data[0]);
    if(data[1]<0){
        alert("Arrival time cannot be negative");
        return;
    }
    if(data[2]<0){
        alert("Burst time cannot be negative");
        return;
    }
    if((extraarrayPID.includes(data[0]))){
        alert("Process id must be unique");
        return;
    }
    //------------------------------------------------------------------
    //animating the table into the html
    document.getElementById("tablebuttons").style.transform="scale(100%)";
    table1.style.transform="scaleY(100%)";
    //creating table row in the html page using the below code
    const tr=document.createElement('tr');
    const td1=document.createElement('td');
    const td2=document.createElement('td');
    const td3=document.createElement('td');
    //putting the data collected from user into this table
    td1.textContent=data[0];
    td2.textContent=data[1];
    td3.textContent=data[2];
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    //appending the row into the table body
    t1.appendChild(tr);

    //extra code
    //creating a new row
    // var row = table1.insertRow();
    // //loop to insert cells
    // for(var i=0;i<3;i++){
    //     //creating and adding cell
    //     var cell = row.insertCell(i);
    //     //giving data to cell
    //     cell.innerHTML = data[i];
    // }
    entries+=1;
    pid.push(data[0]);
    extraarrayPID.push(data[0]);
}
//------------------------------------------------------------------
function resettable(){
    for(let k=0;k<entries;k++){
        console.log(entries);
        document.getElementById("table1").deleteRow(1);
    }
    for(let w=0;w<divarray.length;w++){
        box.removeChild(divarray[w]);
    }
    document.getElementById("tablebuttons").style.transform="scaleY(0%)";
    table1.style.transform="scaleY(0%)";
    document.getElementById("gc").style.transform="scaleY(0%)";
    document.getElementById("average").style.transform="scaleY(0%)";
    pid=[];
    divarray=[];
    i=0;
    extraarrayPID = [];
    completed=[];
    entries=0;
    time=0;
}
function data_extractor(){
    let inputarr=[]
    for(let w=0;w<divarray.length;w++){
        box.removeChild(divarray[w]);
    }
    divarray=[];
    i=0;
    for(let i=1;i<=entries;i++){
        let a1=parseInt(document.getElementById("table1").rows[i].cells[0].innerHTML);
        let a2=parseInt(document.getElementById("table1").rows[i].cells[1].innerHTML);
        let a3=parseInt(document.getElementById("table1").rows[i].cells[2].innerHTML);
        let arr=[a1,a2,a3];
        inputarr.push(arr);
    }
    console.log("This is the input array");
    console.log(inputarr);
    scheduler(inputarr);
}
let time=0;
let free=[];
//this function would do the scheduling and get the completion time stored in an array which would be returned
function scheduler(input){
    pid=[];
    at=[];
    bt=[];
    flag=[];
    for(let w=0;w<input.length;w++){
        pid.push(input[w][0]);
        at.push(input[w][1]);
        bt.push(input[w][2]);
        flag.push(0);
    }    
    var n = pid.length;
            var clock = 0;
            var tot = 0; //number of process done
            var items =[];
            var ct=[];
            var ta=[];
            var wt=[];
            avgwt=0;
            avgta=0;
            

            while(true)
            {
                var min=100;
                var c = n; // c represents the current PID
                if (tot == n) // total no of process = completed process loop will be terminated
                    break;
                
                for (var a=0; a< n; a++)
                {
                    /*
                     * If i'th process arrival time <= system time and its flag=0 and burst<min 
                     * That process will be executed first
                     */ 
                    var count=0;
                    if ((at[a] <= clock) && (flag[a] == 0) && (bt[a]<min))
                        {
                            min=bt[a];
                            c=a;
                        }

                }
                /* If c==n means c value can not updated because no process arrival time< system time so we increase the system time */
                if (c==n){
                    // let a;
                    // a=clock;
                    // let b=[];
                    // b.push(a);
                    // b.push(a+1);
                    divarray[i]=document.createElement("div");
                    box.appendChild(divarray[i]);
                    text = document.createElement("span");
                    text.textContent = (clock+"-"+(clock+1));
                    text.style.paddingTop = "50px"; //padding in order to put them at bottom of box
                    divarray[i].appendChild(text); //appending to the smaller box
                    divarray[i].style.display="flex"; //usng flex to automatically move the text
                    divarray[i].style.justifyContent="center"; //moving the text to the right most corner
                    divarray[i].style.backgroundColor = "white"; //setting color
                    divarray[i].style.border = "0.2px solid white";
                    divarray[i].style.width=(1+"px"); 
                    divarray[i].style.flexGrow=1;
                    clock++;
                    i++;
                    // free.push(b);
                } 
                    
                else
                {
                    var temp = [];
                    temp.push(pid[c]);
                    temp.push(bt[c]);
                    items.push(temp);

                    ct[c]=clock+bt[c];
                    ta[c]=ct[c]-at[c];
                    wt[c]=ta[c]-bt[c];
                    
                    divarray[i]=document.createElement("div"); //create smaller box and add to divarray
                    box.appendChild(divarray[i]); //appending to the main box
                    text = document.createElement("span"); //creating text
                    // timer = timer+ completed[i][2]; //setting the current time
                    text.textContent = "P"+pid[c]+"("+(ct[c]-bt[c])+" - "+ct[c]+")";
                    text.style.paddingTop = "50px"; //padding in order to put them at bottom of box
                    divarray[i].appendChild(text); //appending to the smaller box
                    divarray[i].style.display="flex"; //usng flex to automatically move the text
                    divarray[i].style.justifyContent="center"; //moving the text to the right most corner
                    divarray[i].style.backgroundColor = col[i%2]; //setting color
                    divarray[i].style.border = "0.2px solid white"; //setting border
                    // console.log(completed.length+"    "+(i-count));
                    // console.log("bt"+completed[i-count-1][2]);
                    divarray[i].style.width=bt[c]+"px";
                    divarray[i].style.flexGrow=bt[c];
                    console.log(divarray[i].style.width);
                    clock+=bt[c];
                    flag[c]=1;
                    tot++;
                    i++;
                       
                }
            }

            for(i=0;i<n;i++)
            {
                avgwt +=wt[i];
                avgta +=ta[i];
            }

            avgwt/=n;
            avgta/=n;
            for(let e=0;e<ct.length;e++){
                let temp=[];
                temp.push(pid[e]);
                temp.push(at[e]);
                temp.push(bt[e]);
                temp.push(ct[e]);
                temp.push(ta[e]);
                temp.push(wt[e]);
                completed.push(temp);
            }
            filltable();
            // printStat(ct,ta,wt,avgwt,avgta,pid); 
            // return items;
}
function addroww(dt){
    //creating a new row
    var row = table1.insertRow();
    //loop to insert cells
    for(var i=0;i<6;i++){
        //creating and adding cell
        var cell = row.insertCell();
        //giving data to cell
        cell.innerHTML = dt[i]; 
    }
}
function filltable(){
    console.log("length of completed is :"+completed.length);
    for(let i=0;i<completed.length;i++){
        document.getElementById("table1").deleteRow(1);
    }
    // resettable();
    document.getElementById("tablebuttons").style.transform="scaleY(100%)";
    document.getElementById("gc").style.transform="scaleY(100%)";
    table1.style.transform="scaleY(100%)";
    document.getElementById("average").style.transform="scaleY(100%)";
    let avgtext = "Average Waiting Time: "+parseFloat(avgwt).toFixed(2)+"\nAverage Turnaround Time: "+parseFloat(avgta).toFixed(2);;
    console.log(avgtext);
    document.getElementById("average").textContent=avgtext;
    console.log("completed length: ",completed.length);
    for(let i=0;i<completed.length;i++){
        addroww(completed[i]);
    }
    // create();
    completed=[];
    time=0
}
///
let box = document.getElementById("chart"); //refferne to the outer box
let divarray =[]; //array of all the div(smaller boxes) which will be added to the outer box
let i = 0;//index of the smaller boxes(divarray)
let dataa=[];
// for(let w=0;w<completed.length;w++){
//     dataa.push(completed[2]);
// }
let timer=0;//timer to print current time at the corner

let text; //append the current time to the smaler boxes
let col = ["red","#b30047"]; //random color cboose
