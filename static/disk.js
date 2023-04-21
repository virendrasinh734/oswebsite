let headindexInput;
var table;
var inpus;
var look;
var clook;
var left;
var right;
function eLock(){
    headindexInput= document.getElementById("PID");

    if(headindexInput.value>=200 || headindexInput.value<0){
        alert("Please enter between 0 and 199");
        return;
    }
    table= document.getElementById("table1");
    inpus= document.getElementById("sfsInput");
    look= document.getElementById("look");
    clook= document.getElementById("clook");
    left= document.getElementById("left");
    right= document.getElementById("right");
    mLock();

} 
let theoryFlag = 0;
function HideTheory(){
    if(theoryFlag ==0){
        document.getElementById('theory').style.height = '0vh';
        document.getElementById('TEXTDIV').style.display = 'none';
        document.getElementById('theorytitle').style.fontSize = '2rem';
        document.getElementById('hide').style.padding = '0.4rem';
        document.getElementById('hide').innerHTML = 'SHOW';
        theoryFlag = 1;
        return;
    }
    document.getElementById('theory').style.height = '100vh';
    document.getElementById('TEXTDIV').style.display = 'block';
    document.getElementById('hide').style.padding = '1rem';
    document.getElementById('theorytitle').style.fontSize = '3rem';
    document.getElementById('hide').innerHTML = 'HIDE';
    theoryFlag = 0;
}

let look_value = 0;
let dir_value = 0;
let entries=0;
let inputarr=[];
let seek_count = 0;
let seek_sequence = [];
function data_extractor(){
    for(let i=1;i<=entries;i++){
        let a1=parseInt(document.getElementById("table1").rows[i].cells[0].innerHTML);
        inputarr.push(a1);
    }
    console.log("This is the input array");
    console.log(inputarr);
}

function mLock(){
    // headindexInput = document.getElementById("PID");var 
    console.log(headindexInput.value); 
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
function LookSwitch(){
    look_value=0;
    look.classList.add('active');
    clook.classList.remove('active');
}
function ClookSwitch(){
    look_value=1;
    clook.classList.add('active');
    look.classList.remove('active');
}
function LeftSwitch(){
    dir_value=0;
    try{
        left.classList.add('active');
        right.classList.remove('active');
    }
    catch{

    }
    
}
function RightSwitch(){
    dir_value=1;
    right.classList.add('active');
    left.classList.remove('active');
}
//backend codes
var data = [];
rowIndex = -1;
function InsertRow(){
    if(document.getElementById("pindex").value<0 || document.getElementById("pindex").value>=200){
        alert("Please enter between 0 and 199");
        return;
    }

    for(let j=0 ; j<data.length ; j++){
        if(data[j] == document.getElementById("pindex").value){
            alert("Duplicate Entry");
            return;
        }
    }
    
    rowIndex += 1;
    data[rowIndex] = Math.round(document.getElementById("pindex").value);

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
    let head_main=parseInt(document.getElementById("PID").value)
    console.log(head_main)
    data_extractor();
    if(look_value==0 && dir_value==0){
        L_LOOK(inputarr,head_main);
    }
    else if(look_value==0 && dir_value==1){
        R_LOOK(inputarr,head_main);
    }
    else if(look_value==1 && dir_value==0){
        L_CLOOK(inputarr,head_main);
    }
    else if(look_value==1 && dir_value==1){
        R_CLOOK(inputarr,head_main);
    }
    inputarr=[];
    seek_count = 0;
    seek_sequence = [];
}

    function R_CLOOK(arr, head)
    {
        let distance, cur_track;
 
        let left = [];
        let right = [];

        for(let i = 0; i < inputarr.length; i++)
        {
            if (arr[i] < head)
                left.push(arr[i]);
            if (arr[i] > head)
                right.push(arr[i]);
        }
 
        left.sort(function(a, b){return a - b});
        right.sort(function(a, b){return a - b});
 
        for(let i = 0; i < right.length; i++)
        {
            cur_track = right[i];
 
            // Appending current track
            // to seek sequence
            seek_sequence.push(cur_track);
 
            // Calculate absolute distance
            distance = Math.abs(cur_track - head);
 
            // Increase the total count
            seek_count += distance;
 
            // Accessed track is now new head
            head = cur_track;
        }

        seek_count += Math.abs(head - left[0]);
        head = left[0];
 
        // Now service the requests again
        // which are left
        for(let i = 0; i < left.length; i++)
        {
            cur_track = left[i];
 
            // Appending current track to
            // seek sequence
            seek_sequence.push(cur_track);
 
            // Calculate absolute distance
            distance = Math.abs(cur_track - head);
 
            // Increase the total count
            seek_count += distance;
 
            // Accessed track is now the new head
            head = cur_track;
        }
 
        let str1="Total number of seek operations = " + seek_count ;
 
        let str2="Seek Sequence is ";
 
        for(let i = 0; i < seek_sequence.length; i++)
        {
            str2+=(seek_sequence[i] +" ");
        }
        document.getElementById("tot").innerHTML=str1;
        document.getElementById("seq").innerHTML=str2;
        graph(seek_sequence);
    }

    function L_CLOOK(arr, head)
    {
        let distance, cur_track;
 
        let left = [];
        let right = [];

        for(let i = 0; i < inputarr.length; i++)
        {
            if (arr[i] < head)
                left.push(arr[i]);
            if (arr[i] > head)
                right.push(arr[i]);
        }
 
        left.sort(function(a, b){return a - b});
        right.sort(function(a, b){return a - b});
        left.reverse();
        right.reverse();
 
        for(let i = 0; i < left.length; i++)
        {
            cur_track = left[i];

            seek_sequence.push(cur_track);
 
            distance = Math.abs(cur_track - head);
 
            // Increase the total count
            seek_count += distance;
 
            // Accessed track is now the new head
            head = cur_track;
        }

        seek_count += Math.abs(head - right[0]);
        head = right[0];
 
        for(let i = 0; i < right.length; i++)
        {
            cur_track = right[i];
 
            // Appending current track
            // to seek sequence
            seek_sequence.push(cur_track);
 
            // Calculate absolute distance
            distance = Math.abs(cur_track - head);
 
            // Increase the total count
            seek_count += distance;
 
            // Accessed track is now new head
            head = cur_track;
        }
 
        let str1="Total number of seek operations = " + seek_count ;
 
        let str2="Seek Sequence is ";
 
        for(let i = 0; i < seek_sequence.length; i++)
        {
            str2+=(seek_sequence[i] +" ");
        }
        document.getElementById("tot").innerHTML=str1;
        document.getElementById("seq").innerHTML=str2;
        graph(seek_sequence);
    }

    function R_LOOK(arr, head)
    {
        
        let distance, cur_track;
 
        let left = [];
        let right = [];

        for(let i = 0; i < inputarr.length; i++)
        {
            if (arr[i] < head)
                left.push(arr[i]);
            if (arr[i] > head)
                right.push(arr[i]);
        }
 
        left.sort(function(a, b){return a - b}).reverse();
        right.sort(function(a, b){return a - b});
 
        for(let i = 0; i < right.length; i++)
        {
            cur_track = right[i];
 
            // Appending current track
            // to seek sequence
            seek_sequence.push(cur_track);
 
            // Calculate absolute distance
            distance = Math.abs(cur_track - head);
 
            // Increase the total count
            seek_count += distance;
 
            // Accessed track is now new head
            head = cur_track;
        }

        for(let i = 0; i < left.length; i++)
        {
            cur_track = left[i];
 
            // Appending current track to
            // seek sequence
            seek_sequence.push(cur_track);
 
            // Calculate absolute distance
            distance = Math.abs(cur_track - head);
 
            // Increase the total count
            seek_count += distance;
 
            // Accessed track is now the new head
            head = cur_track;
        }
 
        let str1="Total number of seek operations = " + seek_count ;
 
        let str2="Seek Sequence is ";
 
        for(let i = 0; i < seek_sequence.length; i++)
        {
            str2+=(seek_sequence[i] +" ");
        }
        document.getElementById("tot").innerHTML=str1;
        document.getElementById("seq").innerHTML=str2;
        graph(seek_sequence);
    }

    function L_LOOK(arr, head)
    {
        
        let distance, cur_track;
 
        let left = [];
        let right = [];

        for(let i = 0; i < inputarr.length; i++)
        {
            if (arr[i] < head)
                left.push(arr[i]);
            if (arr[i] > head)
                right.push(arr[i]);
        }
 
        left.sort(function(a, b){return a - b});
        right.sort(function(a, b){return a - b});
        left.reverse();
 
        for(let i = 0; i < left.length; i++)
        {
            cur_track = left[i];

            seek_sequence.push(cur_track);
 
            distance = Math.abs(cur_track - head);
 
            // Increase the total count
            seek_count += distance;
 
            // Accessed track is now the new head
            head = cur_track;
        }

        for(let i = 0; i < right.length; i++)
        {
            cur_track = right[i];
 
            // Appending current track
            // to seek sequence
            seek_sequence.push(cur_track);
 
            // Calculate absolute distance
            distance = Math.abs(cur_track - head);
 
            // Increase the total count
            seek_count += distance;
 
            // Accessed track is now new head
            head = cur_track;
        }
 
        let str1="Total number of seek operations = " + seek_count ;
 
        let str2="Seek Sequence is ";
 
        for(let i = 0; i < seek_sequence.length; i++)
        {
            str2+=(seek_sequence[i] +" ");
        }
        document.getElementById("tot").innerHTML=str1;
        document.getElementById("seq").innerHTML=str2;
        graph(seek_sequence);
    }

    function graph(Arr){
        var xArray = Arr;
        var yArray = [];
        for (var i = 1; i <= xArray.length; i++) {
            yArray.push(i*-1);
        }
        var head = document.getElementById("PID").value;
        
        var data = [{
                    type: 'scatter',
                    x: xArray,
                    y: yArray,
                    mode: 'lines+markers',
                  marker: {
                        size: 10,
                        color: 'rgba(255, 0, 0, 100)',
                        symbol: [" "],
                    }
                }];
        // Define Layout
        var layout = {
          plot_bgcolor:"#24252A",
          paper_bgcolor:"#24252A",
          title: 'Graph',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#ECF0F1'},
          xaxis: {range: [0, 200], title: "Process Index", font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#ECF0F1'},
            zerolinecolor: '#ECF0F1', showgrid: true,
            zeroline: false,
            showline: true},
          yaxis: {range: [-10, 0], title: "...",
          zerolinecolor: '#24252A',
            zeroline: true,
            showline: false,
            showticklabels: false}
        };
        Plotly.newPlot("myPlot", data, layout);
        // Display using Plotly
        
        }