
philst=[];
mealst=[];
cholst=[];
cst=[]
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


    var p1 = document.getElementById("p1");
    var p2 = document.getElementById("p2");
    var p3 = document.getElementById("p3");
    var p4 = document.getElementById("p4");
    var p5 = document.getElementById("p5");
    //chopsick ids
    var p12 = document.getElementById("p12");
    var p15 = document.getElementById("p15");
    var p34 = document.getElementById("p34");
    var p23 = document.getElementById("p23");
    var p45 = document.getElementById("p45");
async function get_states(){
    document.getElementById("st").innerHTML="Starting Simulation";
    var xhr = new XMLHttpRequest();
    document.getElementById("st").style.display="block";
    xhr.open('GET', '/data');
    xhr.onload = async function() {
        if (xhr.status === 200) {
            // Parse the JSON response
            var data = JSON.parse(xhr.responseText);
            var result=[]
            philst=data["array1"];
            mealst=data["array2"];
            cholst=data["array3"];
            cst=data["array4"]
            console.log(cholst);
            for(var i in data){
                result.push([i, data [i]]);
            }
            
            
            let r=result[0]
            // philst=r[0];
            // mealst=r[1];
            // cholst=r[2];
            // console.log(r);
            // Update the HTML elements with the data
            // console.log(data);
            document.getElementById("st").style.display="none";
            for(let l=0;l<r[1].length;l++){
                document.getElementById('00').innerHTML = r[1][l][0];
                document.getElementById('01').innerHTML = r[1][l][1];
                document.getElementById('02').innerHTML = r[1][l][2];
                document.getElementById('03').innerHTML = r[1][l][3];
                document.getElementById('04').innerHTML = r[1][l][4];
                if(cst[l][0]==0){
                    ChopsickToTable("p15");
                }
                else if(cst[l][0]==1){
                    p15ToPerson(1);
                }
                else if(cst[l][0]==5){
                    p15ToPerson(5);
                }
                for(let j=1;j<5;j++){
                    console.log("the req val: "+cholst[l][j]);
                    try{
                        document.getElementById("p1").classList.remove("personactive");
                        document.getElementById("p2").classList.remove("personactive");
                        document.getElementById("p3").classList.remove("personactive");
                        document.getElementById("p4").classList.remove("personactive");
                        document.getElementById("p5").classList.remove("personactive");
                    }
                    catch{
                        console.log("Handled");
                    }
                    if(cholst[l][j]==2){
                        let rt="p"+(j+1);
                        console.log(rt);
                        document.getElementById(rt).classList.add("personactive");   
                    }
                    if(cst[l][j]==0){
                        let temp='p'+j+""+(j+1)
                        ChopsickToTable(temp);
                    }
                    else if(cst[l][j]==j){
                        let temp='p'+j+""+(j+1)
                        ChopsickToTable(temp);
                        var functionName = 'p' + j+""+ (j+1) + 'ToPerson';
                        window[functionName](j);
                    }
                    else if(cst[l][j]==j+1){
                        let temp='p'+j+""+(j+1)
                        ChopsickToTable(temp);
                        var functionName = 'p' + j+""+ (j+1) + 'ToPerson';
                        window[functionName](j+1);
                    }
                }
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

// get_states()
//testcase for example only (actual code present after text case function is over)
    function sleep(ms){
		return new Promise(resolve => setTimeout(resolve,ms));
	}
	async function animm(){
            //initail wait
			await sleep(1000);
            
	}
    animm();
    //front end
    //person ids
    
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
    function p15ToPerson(person){
        if(person == 1){
            p15.style.left = "-3rem";
            p15.style.top = "8rem";
        }
        if(person == 5){
            p15.style.left = "0rem";
            p15.style.top = "9rem";
        }
    }
    function p45ToPerson(person){
        if(person == 5){
            p45.style.left = "1rem";
            p45.style.top = "13rem";
        }
        if(person == 4){
            p45.style.left = "0rem";
            p45.style.top = "17rem";
        }
    }
    function p23ToPerson(person){
        if(person == 2){
            p23.style.left = "-12rem";
            p23.style.top = "13rem";
        }
        if(person == 3){
            p23.style.left = "-12rem";
            p23.style.top = "17rem";
        }
    }
    function p34ToPerson(person){
        if(person == 4){
            p34.style.left = "-2.5rem";
            p34.style.top = "19rem";
        }
        if(person == 3){
            p34.style.left = "-9rem";
            p34.style.top = "19rem";
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
            case "p15": {
                p15.style.left = "-3rem";
                p15.style.top = "11rem";
                break;
            }
            case "p45": {
                p45.style.left = "-2rem";
                p45.style.top = "15rem";
                break;
            }
            case "p23": {
                p23.style.left = "-9rem";
                p23.style.top = "15rem";
                break;
            }
            case "p34": {
                p34.style.left = "-6rem";
                p34.style.top = "17rem";
                break;
            }
            default :{
                console.log("ERROR");
            }
        }
    }