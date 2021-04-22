const box1 = document.querySelector('#box-1');
const box2 = document.querySelector('#box-2');
const box3 = document.querySelector('#box-3');
const box4 = document.querySelector('#box-4');
const box5 = document.querySelector('#box-5');
const box6 = document.querySelector('#box-6');
const box7 = document.querySelector('#box-7');
const box8 = document.querySelector('#box-8');
const box9 = document.querySelector('#box-9');
const backDrop = document.querySelector('.backdrop');
const popUp = document.querySelector('.popup');
let isYouWin = false;
let isComputerWin = false;
let boxNumber = 0;
let nextStep = [];
let nextMovement = [];
const winningChances = [[1,2,3], [1,4,7], [1,5,9], [4,5,6], [2,5,8], [3,5,7], [7,8,9], [3,6,9]];
let trackNums = [];
let trackArray = [];
let computerPlayTracker = [];
const trackPlaces = () => {
    
    if(trackNums.length < 4) {
        trackNums.push(boxNumber);
        if(trackNums.length === 2) {
            //console.log(trackNums)
            let included = false;
            winningChances.forEach((chance) => {
                if(chance.includes(trackNums[0]) && chance.includes(trackNums[1])) {
                    trackArray = chance;
                    included = true;
                    //console.log('tb= '+trackArray);
                }
            });
            if(included) {
                trackArray.forEach((num) => {
                    if (num !== trackNums[0] && num !== trackNums[1] ) {
                        const boxs = document.querySelectorAll('td');
                        if(boxs[num-1].textContent === '') {
                            computerPlayTracker.push(num);
                            console.log(computerPlayTracker);
                            boxs[num-1].textContent = 'X';
                            boxs[num-1].classList.add('computer');
                        } else {
                            playComputer();
                        }
                    
                    }
                });
            } else {
                playComputer();
            }
            
        } else if (trackNums.length === 3) {
            // when length 3, check two x are one row
            let included = false;
            winningChances.forEach((chance) => {
                if(chance.includes(computerPlayTracker[0]) && chance.includes(computerPlayTracker[1])) {
                    trackArray = chance;
                    included = true;
                    //console.log('ta= '+trackArray);
                }
            });
            if(included) {
                trackArray.forEach((num) => {
                    if (num !== computerPlayTracker[0] && num !== computerPlayTracker[1] ) {
                        const boxs = document.querySelectorAll('td');
                        if(boxs[num-1].textContent === '') {
                            computerPlayTracker.push(num);
                            boxs[num-1].textContent = 'X';
                            boxs[num-1].classList.add('computer');
                        } else {
                            trackAfter3Clicks();
                        }
                    
                    }
                });
            } else {
                trackAfter3Clicks();
            }
            
        } else {
            if(computerPlayTracker.length === 2) {
                computerPlay2();
            } else if(computerPlayTracker.length === 3) {
                trackAfter4Clicks();
            } else {
                playComputer();
            }
            
        }
        checkComputerWinner();
    } else {
        // const boxs = document.querySelectorAll('td');
        // boxs.forEach(box => {
        //     if(box.textContent === '') {
        //         box.textContent = 'o';
        //     }
        // } );
        checkComputerWinner();
        if(!isYouWin && !isComputerWin) {
            //alert('Drow');
            document.querySelector('.gameOver').textContent = 'TIE GAME';
            popUpBox();
        }
        
        
       
    }
    
    
}

const popUpBox = () => {
    backDrop.style.display = 'block';
    popUp.style.display = 'block';
    document.querySelector('.btn').addEventListener('click', () => {
        setTimeout(() => {
            reStart();
        }, 1000);
    })
}

// const checkWinner = () => {
//     const boxs = document.querySelectorAll('td');
//     winningChances.forEach((chance) => {
//         if(boxs[chance[0]-1].textContent === 'O' && boxs[chance[1]-1].textContent === 'O' && boxs[chance[2]-1].textContent === 'O') {
//             boxs[chance[0]-1].classList.add('win');
//             boxs[chance[1]-1].classList.add('win');
//             boxs[chance[2]-1].classList.add('win');
//             setTimeout(() => {
//                 alert('you win');
//                 reStart();
//                 const win = 'win';
//                 return win;
//             }, 1000)
            
            
//         } else {
//             if(boxs[chance[0]-1].textContent === 'X' && boxs[chance[1]-1].textContent === 'X' && boxs[chance[2]-1].textContent === 'X') {
//                 boxs[chance[0]-1].classList.add('lost');
//                 boxs[chance[1]-1].classList.add('lost');
//                 boxs[chance[2]-1].classList.add('lost');
//                 setTimeout(() => {
//                     alert('you lost');
//                     reStart();
//                     return;
//                 }, 1000)
                
//             }
//         }
        
//     })
// }

const checkYouWinner = () => {
    const boxs = document.querySelectorAll('td');
    winningChances.forEach((chance) => {
        if(boxs[chance[0]-1].textContent === 'O' && boxs[chance[1]-1].textContent === 'O' && boxs[chance[2]-1].textContent === 'O') {
            boxs[chance[0]-1].classList.add('win');
            boxs[chance[1]-1].classList.add('win');
            boxs[chance[2]-1].classList.add('win');
            isYouWin = true;
            setTimeout(() => {
                // alert('you win');
                // reStart();
                document.querySelector('.gameOver').textContent = 'YOU WIN';
                popUpBox();
                
                return;
            }, 1000)
            
            
        } 
        
    })
}

const checkComputerWinner = () => {
    const boxs = document.querySelectorAll('td');
    winningChances.forEach((chance) => {
         
            if(boxs[chance[0]-1].textContent === 'X' && boxs[chance[1]-1].textContent === 'X' && boxs[chance[2]-1].textContent === 'X') {
                boxs[chance[0]-1].classList.add('lost');
                boxs[chance[1]-1].classList.add('lost');
                boxs[chance[2]-1].classList.add('lost');
                isComputerWin = true;
                setTimeout(() => {
                    // alert('you lost');
                    // reStart();
                    document.querySelector('.gameOver').textContent = 'YOU LOSE';
                    popUpBox();
                    return;
                }, 1000)
                
            }
        
        
    })
}

const trackAfter3Clicks = () => {
    let included = false;
    const trackAfter3 = [];
    winningChances.forEach((chance) => {
        if((chance.includes(trackNums[0]) && chance.includes(trackNums[1])) || (chance.includes(trackNums[0]) && chance.includes(trackNums[2])) || (chance.includes(trackNums[1]) && chance.includes(trackNums[2]))) {
            trackAfter3.push(chance);
            included = true;
            //console.log('t3= ',trackAfter3);
        }
    });
    //debugger
    if(included) {
        let noSpace = true;
        trackAfter3.forEach((chance) => {    // use for loop
            if(noSpace) {
                for(let i = 0; i < chance.length; i++ ) {
                    const boxs = document.querySelectorAll('td');
                    if( boxs[chance[i]-1].textContent === '') {
                        computerPlayTracker.push(chance[i]);
                        boxs[chance[i]-1].textContent = 'X';
                        boxs[chance[i]-1].classList.add('computer');
                        noSpace = false;
                        break;
                    } 
                }
            }
            
            
        });
        if (noSpace) {
            playComputer();
        }
    } else {
        playComputer();
    }
}

const trackAfter4Clicks = () => {      ///  check computer can win in 4th chance
    let included = false;
    const trackAfter4 = [];
    winningChances.forEach((chance) => {
        if((chance.includes(computerPlayTracker[0]) && chance.includes(computerPlayTracker[1])) || (chance.includes(computerPlayTracker[0]) && chance.includes(computerPlayTracker[2])) || (chance.includes(computerPlayTracker[1]) && chance.includes(computerPlayTracker[2]))) {
            trackAfter4.push(chance);
            included = true;
            //console.log('t4= ',trackAfter4);
        }
    });
    //debugger
    if(included) {
        let noSpace = true;
        trackAfter4.forEach((chance) => {    // use for loop
            if(noSpace) {
                for(let i = 0; i < chance.length; i++ ) {
                    const boxs = document.querySelectorAll('td');
                    if( boxs[chance[i]-1].textContent === '') {
                        computerPlayTracker.push(chance[i]);
                        boxs[chance[i]-1].textContent = 'X';
                        boxs[chance[i]-1].classList.add('computer');
                        noSpace = false;
                        break;
                    } 
                }
            }
            
            
        });
        if (noSpace) {
            playComputer();
        }
    } else {
        playComputer();
    }
}

const computerPlay2 = () => {
    let included = false;
    winningChances.forEach((chance) => {
        if(chance.includes(computerPlayTracker[0]) && chance.includes(computerPlayTracker[1])) {
            trackArray = chance;
            included = true;
            //console.log('ta= '+trackArray);
        }
    });
    if(included) {
        trackArray.forEach((num) => {
            if (num !== computerPlayTracker[0] && num !== computerPlayTracker[1] ) {
                const boxs = document.querySelectorAll('td');
                if(boxs[num-1].textContent === '') {
                    computerPlayTracker.push(num);
                    //console.log(computerPlayTracker);
                    boxs[num-1].textContent = 'X';
                    boxs[num-1].classList.add('computer');
                } else {
                    playComputer();
                }
            
            }
        });
    } else {
        playComputer();
    }
    
}

const reStart = () => {
    const boxs = document.querySelectorAll('td');
    boxs.forEach((el) => {
        el.textContent = '';
         el.classList.remove('you');
         el.classList.remove('computer');
         el.classList.remove('lost');
         el.classList.remove('win');
        
    });
    trackNums = [];
    trackArray = [];
    computerPlayTracker = [];
    nextMovement = [];
    nextStep = [];
    isComputerWin = false;
    isYouWin = false;
    backDrop.style.display = 'none';
    popUp.style.display = 'none';
}

const playComputer = () => {
    
    winningChances.forEach((chance) => {
        chance.forEach((num) => {
            if(num === boxNumber) {
                nextStep.push(chance);
            }
        });
    });
    nextStep.forEach((chance) => {
        chance.forEach((num) => {
            if(num !== boxNumber) {
                nextMovement.push(num);
            }
        });
    });
    let checkHaveSpace = false;
    for(let i = 0; i < nextMovement.length; i++ ) {
        const boxs = document.querySelectorAll('td');
        if(boxs[nextMovement[i]-1].textContent === '') {
            checkHaveSpace = true;
            break;
        }
    }
    let matchingRouting = true;
    while(matchingRouting) {
        if(checkHaveSpace) {
            for(let i = 0; i < nextMovement.length; i++) {
                const randomNum = Math.round(Math.random()*10);
                
                if(nextMovement[i] === randomNum) {
                    
                    
                    const boxs = document.querySelectorAll('td');
                    if(boxs[nextMovement[i]-1].textContent === '') {
                        computerPlayTracker.push(nextMovement[i]);
                        boxs[nextMovement[i]-1].textContent = 'X';
                        boxs[nextMovement[i]-1].classList.add('computer');  /////////////////////////////////////////////////
                        matchingRouting = false;
                        break;
                    }
                    
                }
            }
        } else {
            const boxs = document.querySelectorAll('td');
            for(let i = 0; i < boxs.length; i++) {
                if(boxs[i].textContent === '') {
                    boxs[i].textContent = 'X';
                    boxs[i].classList.add('computer');
                    matchingRouting = false;
                    break;
                }
            } 
        }
        
        
    }
    // console.log(nextMovement);
    nextMovement = [];
    nextStep = [];
    
    
}


box1.addEventListener('click', () => {
    if(box1.textContent === ''){
        box1.textContent = 'O';
        box1.classList.add('you');
        boxNumber = 1;
        checkYouWinner()
        if(isYouWin) {
            return;
        }
        setTimeout( () => {
            trackPlaces();
        }, 500)
        //trackPlaces();
    }
    
});
box2.addEventListener('click', () => {
    if(box2.textContent === ''){
        box2.textContent = 'O';
        box2.classList.add('you');
        boxNumber = 2;
        checkYouWinner();
        if(isYouWin) {
            return;
        }
        setTimeout( () => {
            trackPlaces();
        }, 500)
    }
    
});
box3.addEventListener('click', () => {
    if(box3.textContent === ''){
        box3.textContent = 'O';
        box3.classList.add('you');
        boxNumber = 3;
        checkYouWinner();
        if(isYouWin) {
            return;
        }
        setTimeout( () => {
            trackPlaces();
        }, 500)
    }
    
});
box4.addEventListener('click', () => {
    if(box4.textContent === ''){
        box4.textContent = 'O';
        box4.classList.add('you');
        boxNumber = 4;
        checkYouWinner();
        if(isYouWin) {
            return;
        }
        setTimeout( () => {
            trackPlaces();
        }, 500)
    }
    
});
box5.addEventListener('click', () => {
    if(box5.textContent === ''){
        box5.textContent = 'O';
        box5.classList.add('you');
        boxNumber = 5;
        checkYouWinner();
        if(isYouWin) {
            return;
        }
        setTimeout( () => {
            trackPlaces();
        }, 500)
    }
    
});
box6.addEventListener('click', () => {
    if(box6.textContent === ''){
        box6.textContent = 'O';
        box6.classList.add('you');
        boxNumber = 6;
        checkYouWinner();
        if(isYouWin) {
            return;
        }
        setTimeout( () => {
            trackPlaces();
        }, 500)
    }
    
});
box7.addEventListener('click', () => {
    if(box7.textContent === ''){
        box7.textContent = 'O';
        box7.classList.add('you');
        boxNumber = 7;
        checkYouWinner();
        if(isYouWin) {
            return;
        }
        setTimeout( () => {
            trackPlaces();
        }, 500)
    }
    
});
box8.addEventListener('click', () => {
    if(box8.textContent === ''){
        box8.textContent = 'O';
        box8.classList.add('you');
        boxNumber = 8;
        checkYouWinner();
        if(isYouWin) {
            return;
        }
        setTimeout( () => {
            trackPlaces();
        }, 500)
    }
    
});
box9.addEventListener('click', () => {
    if(box9.textContent === ''){
        box9.textContent = 'O';
        box9.classList.add('you');
        boxNumber = 9;
        checkYouWinner();
        if(isYouWin) {
            return;
        }
        setTimeout( () => {
            trackPlaces();
        }, 500)
    }
    
});

