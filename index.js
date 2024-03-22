
const cellCount = 50;
const cellWidth = "40px";
const rowCount = 10;
const ruleLenght = 32;


let currentStep = 0;
let isStopped = true;
// rows is 2d array
let rows = [];

// rule is 32 element boolean array
// let rule = 
let rule = [...Array(ruleLenght).keys()].map(i => {
    return getRandomState();
}).map(x => `${x ? 1 : 0}`).join('');


rows = generateInitialRows();
displayRule();
drawGrid();
init();

const sleep = ms => new Promise(r => setTimeout(r, ms));

function yieldingLoop(count, chunksize, callback, finished) {
    var i = 0;
    (function chunk() {
        var end = Math.min(i + chunksize, count);
        for ( ; i < end; ++i) {
            callback.call(null, i);
        }
        if (i < count) {
            setTimeout(chunk, 0);
        } else {
            finished.call(null);
        }
    })();
}

async function init(){

    yieldingLoop(1000000, 1000, function(i) {
        // use i here
    }, function() {
        if(!isStopped){
            generateNewRow(rows[0]);    
        }
        // generateNewRow(rows[0]);
    });
    // while(true){
    //     if(!isStopped){
    //         generateNewRow();
    //         sleep(1000);
    //     }
    // }
}

function makeIndexValid(index){
    const res1 = index < 0 ? index + cellCount : index;
    const res2 = res1 >= cellCount ? res1 - cellCount : res1;
    return res2;
}

function generateNewRow(currentRow){
    const newRow = currentRow.map( (cell, i) => {
        const index0 = makeIndexValid(i - 2);
        const index1 = makeIndexValid(i - 1);
        const index2 = i;
        const index3 = makeIndexValid(i + 1);
        const index4 = makeIndexValid(i + 2);

        const surr0 = currentRow[index0]
        const surr1 = currentRow[index1]
        const surr2 = currentRow[index2]
        const surr3 = currentRow[index3]
        const surr4 = currentRow[index4]
        const surrounding = surr0 * 16 + surr1 * 8 + surr2 * 4 + surr3 * 2 + surr4;
        const newCell = evolveCell(surrounding);
        return newCell
    })
    console.log(rows);
    // const newRows = [newRow, ...rows.slice(0,-1)]
    const newRows = rows
    newRows.splice(-1);
    newRows.unshift(newRow);
    rows = newRows;
    console.log(rows);
    drawGrid();
}

// surrounding is between 0 and 31
function evolveCell(surrounding){
    const zeroOrOne = [...rule][surrounding]
    // debugger;
    return zeroOrOne === '1';
}

function displayRule(){
    const ruleElement = document.querySelector('#rule')
    ruleElement.innerText = "rule: " + rule;
}

function updateRule(){
    const newRuleInput = document.querySelector('#new-rule')
    const inputValue = newRuleInput.value
    console.log(newRuleInput);
    console.log(inputValue)
    if(inputValue.length != 32){
        const errorElement = document.querySelector('#error-message')
        errorElement.className = 'visible';
        errorElement.innerText = "rule should be 32 character long"
        return;
    }
    errorElement.className = 'hidden';
    errorElement.innerText = ""
    rule = inputValue;
}




function drawGrid(){
    const gridElement = document.querySelector("#grid")
    gridElement.innerHTML = '';
    console.log(gridElement);
    rows.forEach(row => {
        const rowElement = document.createElement("div");
        rowElement.className = "row"
        row.forEach(cell => {
            const cellElement = document.createElement("div");
            const cellClassName = cell ? 'cell green' : 'cell red';
            cellElement.className = cellClassName;
            rowElement.appendChild(cellElement);
        })
        gridElement.appendChild(rowElement);
    })
    // while(true){
        
    // }
}


function getRandomState() {
    const intRes = Math.floor(Math.random() * 2);
    return intRes === 1;
}

function generateInitialRows(){
    let otherRows = [...Array(rowCount - 1).keys()].map( j => {
        return [...Array(cellCount).keys()].map(i => false);
    
    })
    let firstRow = generateFirstRow();
    return [firstRow, ...otherRows];
}

function generateFirstRow(){
    const randomRow = [...Array(cellCount).keys()].map(i => {
        return getRandomState();
    })
    return randomRow;
}

function reset(){
    console.log("reset")
    isStopped = true;
    currentStep = 0;
}

function start(){
    isStopped = false;
}

function pause(){
    isStopped = true;
}

function step(){
    currentStep += 1;
    generateNewRow(rows[0]);
}