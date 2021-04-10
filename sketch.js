
// Funtion to create 2D array
function create2DArray(cols, rows) {
  let arr = new Array(cols);
    for (let i=0;i < arr.length; i++){
      arr[i] = new Array(rows);
    }
  return arr;
}

let grid;
let cols;
let rows;

//resolution of the grid
let resolution = 5;
//framerate
let framerate = 10;

function setup() {
  let renderer = createCanvas(600, 600);
  renderer.parent("canvas");
  resetSketch();
  
  // var resolutionInput = createInput("Resolution", "number");
  // resolutionInput.input(resolutionInputHandler)

}

function resetSketch(){
  frameRate(framerate);
  // calulate cols and rows based on the resolution
  cols = width / resolution;
  rows = height / resolution;
  
  grid =  create2DArray(cols, rows);
  
  // Initialize the grid with random state
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function resolutionInputHandler(){
  resolution = this.value();
}

function framerateInputHandler(){
  framerate = this.value();
}

function refresh(){
  let renderer = createCanvas(500, 500);
  renderer.parent("canvas");
  frameRate(framerate);
  // calulate cols and rows based on the resolution
  cols = width / resolution;
  rows = height / resolution;
  
  grid =  create2DArray(cols, rows);
  
  // Initialize the grid with random state
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw () {
  
  //Set background
  background(0);
  
  
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        
        // Fill cell as black if state is alive
        if (grid[i][j] == 1){
          fill(255);
          stroke(0)
          rect(x,y,resolution-1, resolution-1);
        }
      }
    }
  
  
  /* the next state of a cell cannot be computed based
  on its neighbours next state, but on their current state*/
  //create a secondary grid to store the next state
  let next = create2DArray(cols, rows);
  
  //Compute next based on grid
   for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
          
        let state = grid [i][j];
//         //Edges
//         if(i == 0 || i == cols - 1 || j == 0 || j == rows - 1 ){
//           next[i][j] = state;
//           continue;
//         }
        
        // Count live neighbours
        let neighbours = countNeighbours(grid, i, j);
      
        
        if(state == 0 && neighbours == 3){
          next[i][j] = 1;
        } else if ( state ==1 && (neighbours < 2 || neighbours >3)){
          next[i][j] = 0;
        } else {
          next[i][j] =  grid[i][j];
        }
        
      }
   }
  
  grid = next;
  
}


function countNeighbours(grid, x, y) {
  let sum = 0;
  for(let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        
        sum += grid[col][row];     
      }
  }
  
  sum-= grid[x][y];
  return sum;
}

