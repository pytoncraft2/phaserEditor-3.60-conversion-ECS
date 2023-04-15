import * as Phaser from "phaser"
import Level from "./scenes/Game/Level";
import Menu from "./scenes/Menu/Menu";
import Preload from "./scenes/Preload";

class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {

        this.load.pack("pack", "assets/preload-asset-pack.json");
    }

    create() {

       this.scene.start("Preload");
    }
}

const game = new Phaser.Game({
    width: 800,
    height: 600,
    backgroundColor: "#2f2f2f",
    physics: {
		default: 'matter',
		matter: {
			gravity: { y: 15 },
			debug: true
		}
	},
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    scene: [Boot, Preload, Menu, Level]
});

game.scene.start("Boot");


