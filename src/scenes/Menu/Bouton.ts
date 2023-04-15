
// You can write more code here
import * as Phaser from "phaser";

/* START OF COMPILED CODE */

export default class Bouton extends Phaser.GameObjects.Text {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 408, y ?? 100, "", {});

		this.setOrigin(0.5, 0.5);
		this.text = "Jouer";
		this.setStyle({ "backgroundColor": "#006699", "fontFamily": "Open Sans", "fontSize": "35px", "fontStyle": "bold italic" });
		this.setPadding({"left":150,"top":30,"right":150,"bottom":30});

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
