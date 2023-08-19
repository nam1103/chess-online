class Chess {
	constructor() {
		this.board = [
			[
				new Piece("r", "b"),
				new Piece("n", "b"),
				new Piece("b", "b"),
				new Piece("q", "b"),
				new Piece("k", "b"),
				new Piece("b", "b"),
				new Piece("n", "b"),
				new Piece("r", "b"),
			],
			Array(8).fill(new Piece("p", "b")),
			Array(8).fill(null),
			Array(8).fill(null),
			Array(8).fill(null),
			Array(8).fill(null),
			Array(8).fill(new Piece("p", "w")),
			[
				new Piece("r", "w"),
				new Piece("n", "w"),
				new Piece("b", "w"),
				new Piece("q", "w"),
				new Piece("k", "w"),
				new Piece("b", "w"),
				new Piece("n", "w"),
				new Piece("r", "w"),
			],
		];
		this.lastMove = null;
		this.kingHasMoved = false;
		this.turn = "w";
	}
	isValid(from, to) {
		const pickedPiece = this.board[from[0]][from[1]];
		const [fRow, fCol] = from;
		const [tRow, tCol] = to;
		if (pickedPiece.type === "p") {
			if (pickedPiece.color === "w") {
				if (fCol === tCol) {
					if (this.board[fRow - 1][fCol] === null) {
						if (tRow === fRow - 1) return true;
						if (tRow === 4 && this.board[4][tCol] === null) return true;
					}
				} else {
					if (tRow === fRow - 1) {
						const targetPiece = this.board[tRow][tCol];
						if (tCol === fCol + 1) {
							if (targetPiece !== null && targetPiece?.color === "b")
								return true;
						}

						if (tCol === fCol - 1) {
							if (targetPiece !== null && targetPiece?.color === "b")
								return true;
						}
					}
				}
			} else {
				if (fCol === tCol) {
					if (this.board[fRow + 1][fCol] === null) {
						if (tRow === fRow + 1) return true;
						if (tRow === 3 && this.board[3][tCol] === null) return true;
					}
				} else {
					if (tRow === fRow + 1) {
						const targetPiece = this.board[tRow][tCol];
						if (tCol === fCol + 1) {
							if (targetPiece !== null && targetPiece?.color === "w")
								return true;
						}

						if (tCol === fCol - 1) {
							if (targetPiece !== null && targetPiece?.color === "w")
								return true;
						}
					}
				}
			}
		} else if (pickedPiece.type === "n") {
			let moveValid = false;
			if (tCol === fCol + 1) {
				if (tRow === fRow - 2 || tRow === fRow + 2) {
					moveValid = true;
				}
			} else if (tCol === fCol - 1) {
				if (tRow === fRow - 2 || tRow === fRow + 2) {
					moveValid = true;
				}
			} else if (tCol === fCol + 2) {
				if (tRow === fRow - 1 || tRow === fRow + 1) moveValid = true;
			} else if (tCol === fCol - 2) {
				if (tRow === fRow - 1 || tRow === fRow + 1) moveValid = true;
			}
			if (moveValid) {
				if (pickedPiece.color === "w") {
					if (this.board[tRow][tCol] === null) {
						return true;
					} else if (this.board[tRow][tCol].color !== "w") {
						return true;
					}
				} else {
					if (this.board[tRow][tCol] === null) {
						return true;
					} else if (this.board[tRow][tCol].color !== "b") {
						return true;
					}
				}
			}
		} else if (pickedPiece.type === "r") {
			let moveValid = false;
			if (fCol === tCol) {
				if (fRow > tRow) {
					for (let index = tRow + 1; index < fRow; index++) {
						if (this.board[index][fCol] !== null) return false;
					}
					moveValid = true;
				} else {
					for (let index = fRow + 1; index < tRow; index++) {
						if (this.board[index][fCol] !== null) return false;
					}
					moveValid = true;
				}
			} else if (fRow === tRow) {
				if (fCol > tCol) {
					for (let index = tCol + 1; index < fCol; index++) {
						if (this.board[fRow][index] !== null) return false;
					}
					moveValid = true;
				} else {
					for (let index = fCol + 1; index < tCol; index++) {
						if (this.board[fRow][index] !== null) return false;
					}
					moveValid = true;
				}
			}
			if (moveValid) {
				if (pickedPiece.color === "w") {
					if (this.board[tRow][tCol] === null) {
						return true;
					} else if (this.board[tRow][tCol].color !== "w") {
						return true;
					}
				} else {
					if (this.board[tRow][tCol] === null) {
						return true;
					} else if (this.board[tRow][tCol].color !== "b") {
						return true;
					}
				}
			}
		} else if (pickedPiece.type === "b") {
			let moveValid = false;
			if (Math.abs(tRow - fRow) === Math.abs(tCol - fCol)) {
				const diagonalRows = [];
				const diagonalCols = [];
				if (fCol > tCol) {
					for (let index = fCol - 1; index > tCol; index--) {
						diagonalCols.push(index);
					}
				} else {
					for (let index = fCol + 1; index < tCol; index++) {
						diagonalCols.push(index);
					}
				}
				if (fRow > tRow) {
					for (let index = fRow - 1; index > tRow; index--) {
						diagonalRows.push(index);
					}
				} else {
					for (let index = fRow + 1; index < tRow; index++) {
						diagonalRows.push(index);
					}
				}
				moveValid = true;
				for (let index = 0; index < diagonalRows.length; index++) {
					if (this.board[diagonalRows[index]][diagonalCols[index]] !== null)
						return false;
				}
			}
			if (moveValid) {
				if (pickedPiece.color === "w") {
					if (this.board[tRow][tCol] === null) {
						return true;
					} else if (this.board[tRow][tCol].color !== "w") {
						return true;
					}
				} else {
					if (this.board[tRow][tCol] === null) {
						return true;
					} else if (this.board[tRow][tCol].color !== "b") {
						return true;
					}
				}
			}
		} else if (pickedPiece.type === "k") {
			let moveValid = false;
			if (tRow === fRow - 1) {
				if (tCol === fCol || tCol === fCol - 1 || tCol === fCol + 1) {
					moveValid = true;
				}
			} else if (tRow === fRow + 1) {
				if (tCol === fCol || tCol === fCol - 1 || tCol === fCol + 1) {
					moveValid = true;
				}
			} else if (tRow === fRow) {
				if (tCol === fCol + 1 || tCol === fCol - 1) {
					moveValid = true;
				} else if (
					(tCol === fCol + 2 || tCol === fCol + 3) &&
					!this.kingHasMoved
				) {
					if (this.board[tRow][6] === null && this.board[tRow][5] === null) {
						this.kingHasMoved = true;
						return "castle-short";
					}
				} else if (
					(tCol === fCol - 2 || tCol === fCol - 4) &&
					!this.kingHasMoved
				) {
					if (
						this.board[tRow][1] === null &&
						this.board[tRow][2] === null &&
						this.board[tRow][3] === null
					) {
						this.kingHasMoved = true;
						return "castle-long";
					}
				}
			}

			if (moveValid) {
				if (pickedPiece.color === "w") {
					if (this.board[tRow][tCol] === null) {
						this.kingHasMoved = true;
						return true;
					} else if (this.board[tRow][tCol].color !== "w") {
						this.kingHasMoved = true;
						return true;
					}
				} else {
					if (this.board[tRow][tCol] === null) {
						this.kingHasMoved = true;
						return true;
					} else if (this.board[tRow][tCol].color !== "b") {
						this.kingHasMoved = true;
						return true;
					}
				}
			}
		} else if (pickedPiece.type === "q") {
			let moveValid = false;
			if (fCol === tCol) {
				if (fRow > tRow) {
					for (let index = tRow + 1; index < fRow; index++) {
						if (this.board[index][fCol] !== null) return false;
					}
					moveValid = true;
				} else {
					for (let index = fRow + 1; index < tRow; index++) {
						if (this.board[index][fCol] !== null) return false;
					}
					moveValid = true;
				}
			} else if (fRow === tRow) {
				if (fCol > tCol) {
					for (let index = tCol + 1; index < fCol; index++) {
						if (this.board[fRow][index] !== null) return false;
					}
					moveValid = true;
				} else {
					for (let index = fCol + 1; index < tCol; index++) {
						if (this.board[fRow][index] !== null) return false;
					}
					moveValid = true;
				}
			}
			if (Math.abs(tRow - fRow) === Math.abs(tCol - fCol)) {
				const diagonalRows = [];
				const diagonalCols = [];
				if (fCol > tCol) {
					for (let index = fCol - 1; index > tCol; index--) {
						diagonalCols.push(index);
					}
				} else {
					for (let index = fCol + 1; index < tCol; index++) {
						diagonalCols.push(index);
					}
				}
				if (fRow > tRow) {
					for (let index = fRow - 1; index > tRow; index--) {
						diagonalRows.push(index);
					}
				} else {
					for (let index = fRow + 1; index < tRow; index++) {
						diagonalRows.push(index);
					}
				}
				moveValid = true;
				for (let index = 0; index < diagonalRows.length; index++) {
					if (this.board[diagonalRows[index]][diagonalCols[index]] !== null)
						return false;
				}
			}
			if (moveValid) {
				if (pickedPiece.color === "w") {
					if (this.board[tRow][tCol] === null) {
						return true;
					} else if (this.board[tRow][tCol].color !== "w") {
						return true;
					}
				} else {
					if (this.board[tRow][tCol] === null) {
						return true;
					} else if (this.board[tRow][tCol].color !== "b") {
						return true;
					}
				}
			}
		}

		return false;
	}
	getColumn(index) {
		const column = [];
		for (const row of this.board) {
			column.push(row[index]);
		}
		return column;
	}
	makeMove(from, to) {
		const result = this.isValid(from, to);
		if (result === true) {
			let kingTake = false;
			if (this.board[to[0]][to[1]]?.type === "k") {
				kingTake = true;
			}
			this.board[to[0]][to[1]] = this.board[from[0]][from[1]];
			this.board[from[0]][from[1]] = null;
			this.lastMove = [to[0], to[1]];
			if (kingTake) {
				return "game-over";
			}
		} else if (result === "castle-short") {
			this.board[from[0]][6] = this.board[from[0]][from[1]];
			this.board[from[0]][5] = this.board[from[0]][7];
			this.board[from[0]][7] = null;
			this.board[from[0]][from[1]] = null;
			this.lastMove = [to[0], to[1]];
		} else if (result === "castle-long") {
			this.board[from[0]][2] = this.board[from[0]][from[1]];
			this.board[from[0]][3] = this.board[from[0]][0];
			this.board[from[0]][0] = null;
			this.board[from[0]][from[1]] = null;
			this.lastMove = [to[0], to[1]];
		} else {
			return true;
		}
	}
	nextTurn() {}

	removePiece(row, col) {
		this.board[row].splice(col, 1);
	}
}

class Piece {
	constructor(type, color) {
		this.type = type;
		this.color = color;
	}
}

module.exports = { Chess, Piece };
