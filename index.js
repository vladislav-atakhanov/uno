class Player {
	constructor(name, score) {
		this.name = name
		this._score = score

		this.display()
	}
	get score() {
		return this._score
	}
	set score(value) {

		this.deltaElement.innerHTML = value - this._score

		this._score = value

		if (isNaN(this._score))
			this._score = 0

		this.scoreElement.innerHTML = this._score
	}

	display() {
		this.element = document.createElement("article")
		this.element.className = "player"

		this.element.innerHTML = `
			<h2 class="player__name">${this.name}</h2>
			<p class="player__score">
				<span class="score">${this.score}</span>
				<span class="delta" style="color: #ccc"></span>
			</p>

			<form class="player__form">
				<label class="field">
					<p class="field__title">Очки</p>
					<input type="text" class="field__input">
				</label>
				<button type="submit" class="player__btn btn--submit"></button>
			</form>
		`

		this.scoreElement = this.element.querySelector(".player__score .score")
		this.deltaElement = this.element.querySelector(".player__score .delta")

		const input = this.element.querySelector(".field__input")
		const form = this.element.querySelector("form")
		form.onsubmit = e => {
			e.preventDefault()

			switch (input.value.toLowerCase()) {
				case "o":
					this.score = 0
					break;

				case "d":
					this.element.remove()
					delete players[this.name]
					break;

				default:
					this.score += +input.value
					break;
			}
			input.value = ""
		}

		document.querySelector(".players").appendChild(this.element)
	}
}

const players = {}
document.querySelector(".new-player").onsubmit = e => {
	e.preventDefault()
	const input = document.querySelector(".new-player__input")
	const name = input.value
	input.value = ""

	if (name)
		players[name] = new Player(name, 0)
}
document.querySelector(".btn--zero").onclick = e => {
	Object.keys(players).forEach(key => players[key].score = 0)
}