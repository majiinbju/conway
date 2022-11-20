class gameOfLife {

    constructor() {
        // defining cell size
        this.cell_size = 5
        // color for dead cells
        this.dead_color = `#181818`
        // color for live cells
        this.alive_color = `#FF756B`
        // maths to calculate rows & columns
        this.cells_in_rows = Math.floor(canvas.width / this.cell_size)
        this.cells_in_columns = Math.floor(canvas.height / this.cell_size)
        // 2d array to hold state for current life cycle 
        this.active_array = []
        // same for previous life cycle
        this.inactive_array = []

        this.arrayInitialization = () => {
            // creating two 2d arrays with zeroes
            for (let i = 0; i < this.cells_in_rows; i++) {
                this.active_array[i] = []
                for (let j = 0; j < this.cells_in_columns; j++) {
                    this.active_array[i][j] = 0
                }
            }

            this.inactive_array = this.active_array
        }

        this.arrayRandomize = () => {
            // randomly filling active array with ones and zeroes
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_columns; j++) {
                    this.active_array[i][j] = (Math.random() > 0.5) ? 1 : 0
                }
            }
        }

        this.fillArray = () => {
            // fill array with color based on its state (1 - active, 0 - inactive)
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_columns; j++) {
                    let color;

                    if (this.active_array[i][j] == 1)
                    color = this.alive_color
                    else
                    color = this.dead_color

                    ctx.fillStyle = color
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size)
                }
            }
        }

        this.setCellValueHelper = (row, col) => {
            try {
                return this.active_array[row][col]
            }
            catch {
                return 0
            }
        }

        this.countNeighbours = () => {
            // counting neighbours for one cell
            let totalNeighbours = 0
            // one row up and counting neighbours
            totalNeighbours += this.active_array[row-1][col-1]
            totalNeighbours += this.active_array[row-1][col]
            totalNeighbours += this.active_array[row-1][col+1]
            // one row down
            totalNeighbours += this.active_array[row+1][col-1]
            totalNeighbours += this.active_array[row+1][col]
            totalNeighbours += this.active_array[row+1][col+1]
            // same row
            totalNeighbours += this.active_array[row][col-1]
            totalNeighbours += this.active_array[row][col+1]
        }

        this.updateCellValue = (row, col) => {
            // updating cell based on sum of its neighbours
            const total = this.countNeighbours(row, col)

            // cells with more than 4 or less than 3 neighbours die
            if (total > 4 || total < 3) {
                return 0
            }
            // dead cell with 3 neighbours comes alive
            else if (this.active_array[row][col] === 0 && total === 3) {
                return 1
            }
            // returning its status back 
            else {
                return this.active_array[row][col]
            }
        }

        this.updateLifeCycle = () => {
            // setting new cell value to inactive array
            for (let i = 0; i < this.cells_in_rows; i++) {
                for(let j = 0; j < this.cells_in_columns; j++) {
                    let new_state = this.updateCellValue(i, j)
                    this.inactive_array[i][j] = new_state
                }
            }
            this.active_array = this.inactive_array
        }

        this.gameSetUp = () => {
            this.arrayInitialization()
        }
        
        this.runGame = () => {
            this.updateLifeCycle()
            this.fillArray()
        }
    }
}