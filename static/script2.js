function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function animm(){
        //initail wait
        await sleep(1000);
        //12
        console.log("CHOPSTICK 12");
        //1
        p12ToPerson(1);
        p1.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p12");
        p1.classList.remove("personactive"); //just for test case
        await sleep(500);
        //2
        p12ToPerson(2);
        p2.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p12");
        p2.classList.remove("personactive"); //just for test case
        //13
        console.log("CHOPSTICK 13");
        await sleep(500);
        //1
        p13ToPerson(1);
        p1.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p13");
        p1.classList.remove("personactive"); //just for test case
        await sleep(500);
        //3
        p13ToPerson(3);
        p3.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p13");
        //34
        console.log("CHOPSTICK 34");
        p3.classList.remove("personactive"); //just for test case
        await sleep(500);
        //3
        p34ToPerson(3);
        p3.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p34");
        p3.classList.remove("personactive"); //just for test case
        await sleep(500);
        //4
        p34ToPerson(4);
        p4.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p34");
        p4.classList.remove("personactive"); //just for test case
        //25
        console.log("CHOPSTICK 25");
        await sleep(500);
        //2
        p25ToPerson(2);
        p2.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p25");
        p2.classList.remove("personactive"); //just for test case
        await sleep(500);
        //5
        p25ToPerson(5);
        p5.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p25");
        p5.classList.remove("personactive"); //just for test case
        //45
        console.log("CHOPSTICK 45");
        await sleep(500);
        //4
        p45ToPerson(4);
        p4.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p45");
        p4.classList.remove("personactive"); //just for test case
        await sleep(500);
        //5
        p45ToPerson(5);
        p5.classList.add("personactive"); //just for test case
        await sleep(500);
        ChopsickToTable("p45");
        p5.classList.remove("personactive"); //just for test case
        console.log("FINSHED");
}
animm();
//front end
//person ids
var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var p3 = document.getElementById("p3");
var p4 = document.getElementById("p4");
var p5 = document.getElementById("p5");
//chopsick ids
var p12 = document.getElementById("p12");
var p13 = document.getElementById("p13");
var p34 = document.getElementById("p34");
var p25 = document.getElementById("p25");
var p45 = document.getElementById("p45");
//move chopsticks to designated person
function p12ToPerson(person){
    if(person == 1){
        p12.style.left = "-7.5rem";
        p12.style.top = "8rem";
    }
    if(person == 2){
        p12.style.left = "-10rem";
        p12.style.top = "9rem";
    }
}
function p13ToPerson(person){
    if(person == 1){
        p13.style.left = "-3rem";
        p13.style.top = "8rem";
    }
    if(person == 3){
        p13.style.left = "0rem";
        p13.style.top = "9rem";
    }
}
function p34ToPerson(person){
    if(person == 3){
        p34.style.left = "1rem";
        p34.style.top = "13rem";
    }
    if(person == 4){
        p34.style.left = "0rem";
        p34.style.top = "17rem";
    }
}
function p25ToPerson(person){
    if(person == 2){
        p25.style.left = "-12rem";
        p25.style.top = "13rem";
    }
    if(person == 5){
        p25.style.left = "-12rem";
        p25.style.top = "17rem";
    }
}
function p45ToPerson(person){
    if(person == 4){
        p45.style.left = "-2.5rem";
        p45.style.top = "19rem";
    }
    if(person == 5){
        p45.style.left = "-9rem";
        p45.style.top = "19rem";
    }
}
//place back the chopsticks
function ChopsickToTable(stick){
    switch(stick){
        case "p12": {
            p12.style.left = "-7.5rem";
            p12.style.top = "11rem";
            break;
        }
        case "p13": {
            p13.style.left = "-3rem";
            p13.style.top = "11rem";
            break;
        }
        case "p34": {
            p34.style.left = "-2rem";
            p34.style.top = "15rem";
            break;
        }
        case "p25": {
            p25.style.left = "-9rem";
            p25.style.top = "15rem";
            break;
        }
        case "p45": {
            p45.style.left = "-6rem";
            p45.style.top = "17rem";
            break;
        }
        default :{
            console.log("ERROR");
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function get_states(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/data');
    xhr.onload = async function() {
        if (xhr.status === 200) {
            // Parse the JSON response
            var data = JSON.parse(xhr.responseText);
            var result=[]
            for(var i in data){
                result.push([i, data [i]]);
            }
            let r=result[0]
            // Update the HTML elements with the data
            console.log(data)
            for(let l=0;l<r[1].length;l++){
                document.getElementById('00').innerHTML = r[1][l][0];
                document.getElementById('01').innerHTML = r[1][l][1];
                document.getElementById('02').innerHTML = r[1][l][2];
                document.getElementById('03').innerHTML = r[1][l][3];
                document.getElementById('04').innerHTML = r[1][l][4];
                await sleep(1000);
                }
            
            // ...
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

get_states()