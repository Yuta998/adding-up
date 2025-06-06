

'use strict';


const fs = require('fs');
const readline = require('readline');
const rs =fs.ReadStream('./popu-pref.csv');


const rl = readline.createInterface({'input':rs,'output':{}});


const instance = new Map();


rl.on('line',(lineString) => {


const columns=lineString.split(',');

        const year = parseInt(columns[0]);

	const prefecture = columns[2];


	const popu=   parseInt( columns[7]);

	if(year===2010||year===2015){
let obj = instance.get(prefecture);


if(obj){


if(year==2010){

	obj.popu10 += popu;
}
if(year==2015){

obj.popu15 +=popu; 

}
}


else{//初期化


const newobj={popu10:0, popu15:0, change:null};


	if(year==2010){
newobj.popu10+=popu;

	}
if(year==2015){

newobj.popu15+=popu;

}

instance.set(prefecture,newobj);	


}//else

}


}//strings
);

rl.resume();


rl.on('close',() =>{

for(let two  of instance){

	const  number=two[1];


number.change=number.popu15/number.popu10;



//	console.log(number);


}


const handle = Array.from(instance).sort((pair1, pair2) => { return pair2[1].change - pair1[1].change;});




//console.log(instance);

console.log(handle);


});

	



//rl.resume();









