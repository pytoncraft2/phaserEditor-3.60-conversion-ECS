
// You can write more code here
import * as Phaser from "phaser";
import Bouton from "./Bouton";

/* START OF COMPILED CODE */

export default class Menu extends Phaser.Scene {

	constructor() {
		super("Menu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text_2
		const text_2 = this.add.text(960, 375, "", {});
		text_2.setOrigin(0.5, 0.5);
		text_2.text = "Huipat Aventure";
		text_2.setStyle({ "color": "#000000ff", "fontFamily": "Open Sans", "fontSize": "46px", "fontStyle": "bold" });

		// rectangle_2
		const rectangle_2 = this.add.rectangle(960, 400, 128, 128);
		rectangle_2.scaleX = 2.579608498064135;
		rectangle_2.scaleY = 0.05439157547258821;
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 8111652;

		// text_1
		const text_1 = this.add.text(960, 729, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Des insectes se sont emparés des matériaux de la tente !\n\nRetrouver les matériaux dans les 10 niveaux.\n\nCertain insectes peuvent vous transmettre de nouvelle capacités une fois vaincu !";
		text_1.setStyle({ "align": "center", "color": "#7b7b7bff", "fontFamily": "Open Sans", "fontSize": "24px" });

		// bouton
		const bouton = new Bouton(this, 960, 505);
		this.add.existing(bouton);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
