import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
    constructor(props) {
        super(props);
        // TODO: set initial state
        this.state = {
            hasWon: false,
            board: this.createBoard()
        };
        this.flipCellsAround = this.flipCellsAround.bind(this);
    }

    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: 0.25
    };

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

    createBoard() {
        let board = [];
        // DONE: create array-of-arrays of true/false values
        let innerArr, randBool;

        for (let i = 0; i < this.props.nrows; i++) {
            innerArr = [];
            for (let j = 0; j < this.props.ncols; j++) {
                randBool = Math.random() < this.props.chanceLightStartsOn;
                innerArr.push(randBool);
            }
            board.push(innerArr);
        }

        return board;
    }

    /** handle changing a cell: update board & determine if winner */

    flipCellsAround(coord) {
        console.log(coord);
        let { ncols, nrows } = this.props;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);

        function flipCell(y, x) {
            // if this coord is actually on board, flip it

            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }

        // TODO: flip this cell and the cells around it
        flipCell(y, x);
        flipCell(y, x - 1);
        flipCell(y, x + 1);
        flipCell(y - 1, x);
        flipCell(y + 1, x);

        // win when every cell is turned off
        // TODO: determine is the game has been won

        let hasWon = board.every(row => row.every(cell => !cell));

        this.setState({ board, hasWon });
    }

    /** Render game board or winning message. */

    render() {
        // if the game is won, just show a winning msg & render nothing else
        if (this.state.hasWon) {
            return <h1>YOU WON!!!</h1>;
        }
        // TODO

        // make table board
        let tblBoard = this.state.board.map((row, y) => (
            <tr key={y}>
                {row.map((el, x) => {
                    let coord = `${y}-${x}`;
                    return (
                        <Cell
                            key={coord}
                            coord={coord}
                            isLit={el}
                            flipCellsAroundMe={this.flipCellsAround}
                        />
                    );
                })}
            </tr>
        ));

        return (
            <table className="Board">
                <tbody>{tblBoard}</tbody>
            </table>
        );

        // TODO
    }
}

export default Board;
