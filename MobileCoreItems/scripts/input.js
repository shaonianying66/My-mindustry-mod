const vars = require("vars");

Events.on(EventType.ClientLoadEvent, cons(e => {
	let input = extend(MobileInput, {
		updateMovement(unit) {
			if (vars.move) this.super$updateMovement(unit);
		},

		drawTop() { // for MI2
			if (this.mode == PlaceMode.schematicSelect) {
				this.drawSelection(this.lineStartX, this.lineStartY, this.lastLineX, this.lastLineY, 114514);
			}
		},
	});
	Vars.control.input = input;
}));

//附身分配器
Blocks.distributor.buildType = () => {
	return extend(Router.RouterBuild, Blocks.distributor, {
		canControl() {
			return true;
		},
	});
}

//Le Zooom

const defaultMinZoomLim = Vars.renderer.minZoom;
const defaultMaxZoomLim = Vars.renderer.maxZoom;
print("default min zoom: " + defaultMinZoomLim);
print("defaultn max zoom: " + defaultMaxZoomLim);

const minZoomLim = 0.5;
const maxZoomLim = 25;

// default extended zoom limits
const minZoom = 0.75;
const maxZoom = 20;

function resetZoomLim(toOriginal) {
	if (toOriginal) {
		Vars.renderer.minZoom = defaultMinZoomLim;
		Vars.renderer.maxZoom = defaultMaxZoomLim;
	} else {
		Vars.renderer.minZoom = minZoomLim;
		Vars.renderer.maxZoom = maxZoomLim;
	}
}


function updateZoom(min, max) {
	Vars.renderer.minZoom = min;
	Vars.renderer.maxZoom = max;
}

if (!Vars.headless) {
	updateZoom(minZoomLim, maxZoomLim);
}