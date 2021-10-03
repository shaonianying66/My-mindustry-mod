const vars = require("vars");
const coreItems = require("coreItems");
const skipWave = require("skipWave");
const players = require("players");
const schematics = require("schematics");
require("input");

UnitTypes.mega.isCounted = true;
Blocks.itemBridge.allowConfigInventory = true;

var mainTable = new Table();
const tables = [skipWave.table, players.table, schematics.table];
var index = -1;

Events.on(EventType.ClientLoadEvent, cons(e => {

	Events.run(WorldLoadEvent, () => {
		rebuild();
	});
	
	Events.run(Trigger.update, e => {
		vars.fontScale = 0.75;
		vars.imageSize = Vars.iconSmall * vars.fontScale;
	});
	
	var map = Core.scene.find("minimap/position");
	map.defaults().top().right();
	
	let child1 = map.getChildren().get(0);
	let child2 = map.getChildren().get(1);
	child1.remove();
	child2.remove();
	
	map.add(mainTable);
	map.table(cons(t => {
		t.add(child1);
		t.row();
		t.add(child2);
	}));
	
}));

function rebuild(){
	coreItems.build();
	players.build();
	skipWave.rebuild();
	schematics.rebuild();

	mainTable.clear();
	mainTable.table(cons(t => {
		t.add(coreItems.table);
	})).right();
	mainTable.row();
	
	mainTable.table(cons(t => {
		t.table(cons(tt => {
			tt.update(() => {
				tt.clear();
				if(index >= 0) tt.add(tables[index]).fillY();
			});
		}));
		
		t.table(cons(buttons => {
			buttons.button(new TextureRegionDrawable(Blocks.spawn.uiIcon), Styles.clearToggleTransi, 35, () => index = 0).growY()
				.update(b => b.setChecked(index == 0));
			buttons.row();
			
			buttons.button(Icon.playersSmall, Styles.clearToggleTransi, 35, () => index = 1).growY()
				.update(b => b.setChecked(index == 1));
			buttons.row();
			
			buttons.button(Icon.pasteSmall, Styles.clearToggleTransi, 35, () => index = 2).growY()
				.update(b => b.setChecked(index == 2));
			buttons.row();
			buttons.button(Icon.noneSmall, Styles.clearToggleTransi, 35, () => index = -1).growY()
				.update(b => b.setChecked(index == -1));
		})).fillY();
	})).right();
	
}