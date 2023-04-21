import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  lastOpenedCard = null;
  combinedData = ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5'];
  moves = 0;
  combinedDataNew = [];
  gameWon: boolean = false;

  ngOnInit() {
    this.initGame();
  }


  initGame(){
    this.moves = 0;
    this.lastOpenedCard = null;
    this.combinedDataNew = [];
    this.gameWon = false;
    this.randomizeTheArr(this.combinedData);
    this.modifyCombinedData();
  }


  randomizeTheArr(arr) {
    for(let i=0;i<arr.length; i++){
      let num1 = Math.floor(Math.random()*(arr.length));
      let num2 = Math.floor(Math.random()*(arr.length));
      [arr[num1], arr[num2]] = [arr[num2], arr[num1]];
    }
  }

  showVal(data: any) {
    if(data['show']) return;
    data['show'] = true;
    this.moves++;
    if (this.lastOpenedCard) {
      if (this.lastOpenedCard.val === data.val) {
        data.show = true;
        this.moves++;
        this.lastOpenedCard.show = true;
        console.log('it Matched', data['val']);
        this.lastOpenedCard = null;
      } else {
        this.lastOpenedCard['show'] = false;
        this.lastOpenedCard = null;
        setTimeout(() => {
          data['show'] = false;  
        }, 1000);
        console.log("oops didn't match", data['val']);
      }
    } else {
      this.lastOpenedCard = data;
      console.log('first one::', data['val']);
    }

    if (this.checkWin()) {
      alert(`Awesome buddy!! You have won in ${this.moves} moves`);
      this.gameWon = true;
    }
  }

  checkWin(): boolean {
    return this.combinedDataNew.every((obj) => {
      return obj.show == true;
    });
  }

  modifyCombinedData() {
    this.combinedDataNew = this.combinedData.map((data) => {
      let obj = {};
      obj['val'] = data;
      obj['show'] = false;
      return obj;
    });
  }

  restartGame(){
    this.initGame();
  }
}
