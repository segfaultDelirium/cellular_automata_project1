"use strict";
// import { getMinimalSpanningTree } from "./minimalSpanningTree.js";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("hello from js");
const cellCount = 50;
const rowCount = 30;
const ruleLenght = 32;
let currentStep = 0;
let isStopped = true;
// rows is 2d array
let rows = [];
// rule is 32 element boolean array
let rule = "00110110111100001010100111011010";
// let rule = "10000000000000000000000000000000"
// let rule = [...Array(ruleLenght).keys()].map(i => {
//   return getRandomState();
// }).map(x => `${x ? 1 : 0}`).join('');
rows = generateInitialRows();
displayRule();
drawGrid();
displayPercentageOfOnes();
init();
document.querySelector("#reset").addEventListener('click', reset);
document.querySelector("#start").addEventListener('click', start);
document.querySelector("#pause").addEventListener('click', pause);
document.querySelector("#step").addEventListener('click', step);
document.querySelector("#update-rule").addEventListener('click', updateRule);
var intervalID = window.setInterval(runProgram, 500);
runProgram();
function displayPercentageOfOnes() {
    const onesSum = rows[0].map(cell => cell ? 1 : 0).reduce((acc, el) => acc + el);
    const percentage = onesSum * 100.0 / cellCount;
    const element = document.querySelector("#percentage-of-ones");
    element.innerText = `percentage of ones: ${percentage}`;
}
function displayCurrentStepCounter() {
    const stepCounter = document.querySelector("#current-step-counter");
    stepCounter.innerText = `current step: ${currentStep}`;
}
function runProgram() {
    if (!isStopped) {
        step();
    }
}
function reset() {
    console.log("reset");
    rows = generateInitialRows();
    drawGrid();
    isStopped = true;
    currentStep = 0;
}
function start() {
    isStopped = false;
}
function pause() {
    isStopped = true;
}
function step() {
    currentStep += 1;
    generateNewRow(rows[0]);
    displayCurrentStepCounter();
    displayPercentageOfOnes();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isStopped) {
            generateNewRow(rows[0]);
        }
    });
}
function makeIndexValid(index) {
    const res1 = index < 0 ? index + cellCount : index;
    const res2 = res1 >= cellCount ? res1 - cellCount : res1;
    return res2;
}
function convertToZeroOne(bool) {
    return bool ? 1 : 0;
}
function generateNewRow(currentRow) {
    const newRow = currentRow.map((cell, i) => {
        const index0 = makeIndexValid(i - 2);
        const index1 = makeIndexValid(i - 1);
        const index2 = i;
        const index3 = makeIndexValid(i + 1);
        const index4 = makeIndexValid(i + 2);
        const surr0 = convertToZeroOne(currentRow[index0]);
        const surr1 = convertToZeroOne(currentRow[index1]);
        const surr2 = convertToZeroOne(currentRow[index2]);
        const surr3 = convertToZeroOne(currentRow[index3]);
        const surr4 = convertToZeroOne(currentRow[index4]);
        const surrounding = surr0 * 16 + surr1 * 8 + surr2 * 4 + surr3 * 2 + surr4;
        const newCell = evolveCell(rule, surrounding);
        return newCell;
    });
    // console.log(rows);
    // const newRows = [newRow, ...rows.slice(0,-1)]
    const newRows = rows;
    newRows.splice(-1);
    newRows.unshift(newRow);
    rows = newRows;
    // console.log(rows);
    drawGrid();
}
// surrounding is between 0 and 31
function evolveCell(rule, surrounding) {
    // console.log(surrounding)
    const zeroOrOne = [...rule].reverse()[surrounding];
    // console.log(zeroOrOne)
    // debugger;
    return zeroOrOne === '1';
}
// evolveCellTest()
// function evolveCellTest() {
//   const rule = "00110110111100001010100111011010";
//   const surrounding = 2;
//   const newCell = evolveCell(rule, surrounding);
//   console.log(newCell);
// }
function displayRule() {
    const ruleElement = document.querySelector('#rule');
    ruleElement.innerText = "rule: " + rule;
}
function updateRule() {
    const newRuleInput = document.querySelector('#new-rule');
    const inputValue = newRuleInput.value;
    console.log(newRuleInput);
    console.log(inputValue);
    const errorElement = document.querySelector('#error-message');
    if (inputValue.length != 32) {
        errorElement.className = 'visible';
        errorElement.innerText = "rule should be 32 character long";
        return;
    }
    errorElement.className = 'hidden';
    errorElement.innerText = "";
    rule = inputValue;
    displayRule();
}
function drawGrid() {
    const gridElement = document.querySelector("#grid");
    gridElement.innerHTML = '';
    // console.log(gridElement);
    rows.forEach(row => {
        const rowElement = document.createElement("div");
        rowElement.className = "row";
        row.forEach(cell => {
            const cellElement = document.createElement("div");
            const cellClassName = cell ? 'cell green' : 'cell red';
            cellElement.className = cellClassName;
            rowElement.appendChild(cellElement);
        });
        gridElement.appendChild(rowElement);
    });
    // while(true){
    // }
}
function getRandomState() {
    const intRes = Math.floor(Math.random() * 2);
    return intRes === 1;
}
function generateInitialRows() {
    let otherRows = [...Array(rowCount - 1).keys()].map(j => {
        return [...Array(cellCount).keys()].map(i => false);
    });
    let firstRow = generateFirstRow();
    return [firstRow, ...otherRows];
}
function generateFirstRow() {
    const randomRow = [...Array(cellCount).keys()].map(i => {
        return getRandomState();
    });
    return randomRow;
}
//# sourceMappingURL=main.js.map