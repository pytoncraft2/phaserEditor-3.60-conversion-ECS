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
    width: 1920,
    height: 1080,
    backgroundColor: "#eee",
    physics: {
		default: 'matter',
		matter: {
			gravity: { y: 15 },
			debug: true
		}
	},
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Boot, Preload, Menu, Level]
});

game.scene.start("Boot");


