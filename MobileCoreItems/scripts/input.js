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
		
		// update(){
			// var lastMode = this.mode;
			// this.super$update();
			// if(this.schematicMode && this.mode != lastMode) this.mode = lastMode;
		// },
		// 
		// touchDown(screenX, screenY, pointer, button){
			// if(Vars.state.isMenu()) return false;
	// 
			// this.down = true;
	// 
			// //get tile on cursor
			// var cursor = this.tileAt(screenX, screenY);
	// 
			// var worldx = Core.input.mouseWorld(screenX, screenY).x, worldy = Core.input.mouseWorld(screenX, screenY).y;
	// 
			// //ignore off-screen taps
			// if(cursor == null || Core.scene.hasMouse(screenX, screenY)) return false;
	// 
			// //only begin selecting if the tapped block is a request
			// //if(this.getRequest(cursor)) this.selecting = this.getRequest(cursor);
	// 
			// //call tap events
			// if(pointer == 0 && !this.selecting){
				// if(this.schematicMode && this.block == null){
					// this.mode = PlaceMode.schematicSelect;
					// //engage schematic selection mode
					// var tileX = this.tileX(screenX), tileY = this.tileY(screenY);
					// this.lineStartX = tileX;
					// this.lineStartY = tileY;
					// this.lastLineX = tileX;
					// this.lastLineY = tileY;
				// }else if(Core.settings.getBool("keyboard")){
					// //shoot on touch down when in keyboard mode
					// Vars.player.shooting = true;
				// }
			// }
	// 
			// return false;
		// },
	// 
		// longPress(x, y) {
			// // if (state.isMenu() || player.dead()) return false;
// 
			// //get tile on cursor
			// var cursor = this.tileAt(x, y);
// 
			// if (Core.scene.hasMouse(x, y) || this.schematicMode) return false;
// 
			// //handle long tap when player isn't building
			// if (this.mode == PlaceMode.none) {
				// var pos = Core.input.mouseWorld(x, y);
// 
				// if (Vars.player.unit() instanceof Payloadc) {
					// let target = Units.closest(Vars.player.team(), pos.x, pos.y, 8, u => u.isAI() && u.isGrounded() && Vars.player.unit().canPickup(u) && u.within(pos, u.hitSize + 8));
					// if (target != null) {
						// this.payloadTarget = target;
					// } else {
						// var build = Vars.world.buildWorld(pos.x, pos.y);
// 
						// if (build != null && build.team == Vars.player.team() && (Vars.player.unit().canPickup(build) || build.getPayload() != null && Vars.player.unit().canPickupPayload(build.getPayload()))) {
							// this.payloadTarget = build;
						// } else if (Vars.player.unit().hasPayload()) {
							// //drop off at position
							// this.payloadTarget = new Vec2(pos);
						// } else {
							// this.manualShooting = true;
							// this.target = null;
						// }
					// }
				// } else {
					// this.manualShooting = true;
					// this.target = null;
				// }
// 
				// if (!Vars.state.isPaused()) Fx.select.at(pos);
			// } else {
// 
				// //ignore off-screen taps
				// if (cursor == null) return false;
// 
				// //remove request if it's there
				// //long pressing enables line mode otherwise
				// this.lineStartX = cursor.x;
				// this.lineStartY = cursor.y;
				// this.lastLineX = cursor.x;
				// this.lastLineY = cursor.y;
				// this.lineMode = true;
// 
				// if (this.mode == PlaceMode.breaking) {
					// if (!Vars.state.isPaused()) Fx.tapBlock.at(cursor.worldx(), cursor.worldy(), 1);
				// } else if (this.block != null) {
					// this.updateLine(this.lineStartX, this.lineStartY, cursor.x, cursor.y);
					// if (!Vars.state.isPaused()) Fx.tapBlock.at(cursor.worldx() + this.block.offset, cursor.worldy() + this.block.offset, this.block.size);
				// }
			// }
// 
			// return false;
		// },
		// 
		// getRequest(tile){
            // Tmp.r2.setSize(Vars.tilesize);
            // Tmp.r2.setCenter(tile.worldx(), tile.worldy());
    // 
            // this.selectRequests.each(req => {
                // var other = req.tile();
    // 
                // if(other == null) return;
    // 
                // if(!req.breaking){
                    // Tmp.r1.setSize(req.block.size * Vars.tilesize);
                    // Tmp.r1.setCenter(other.worldx() + req.block.offset, other.worldy() + req.block.offset);
    // 
                // }else{
                    // Tmp.r1.setSize(other.block().size * Vars.tilesize);
                    // Tmp.r1.setCenter(other.worldx() + other.block().offset, other.worldy() + other.block().offset);
                // }
    // 
                // if(Tmp.r2.overlaps(Tmp.r1)) return req;
            // });
            // return null;
        // },
    // 
		// tileAt(x, y) {
			// return Vars.world.tile(this.tileX(x), this.tileY(y));
		// },
// 
		// tileX(cursorX) {
			// var vec = Core.input.mouseWorld(cursorX, 0);
			// if (this.selectedBlock()) {
				// vec.sub(this.block.offset, this.block.offset);
			// }
			// return World.toTile(vec.x);
		// },
// 
		// tileY(cursorY) {
			// var vec = Core.input.mouseWorld(0, cursorY);
			// if (this.selectedBlock()) {
				// vec.sub(this.block.offset, this.block.offset);
			// }
			// return World.toTile(vec.y);
		// },
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