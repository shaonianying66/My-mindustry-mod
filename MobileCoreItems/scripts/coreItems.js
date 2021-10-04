const vars = require("vars");

var table = new Table();
var timer = new Interval();

function rebuild(){
	table.clear();
	table.background(Styles.black6);
  
  /* add info */
	table.table(cons(t => {
		t.image(Blocks.coreNucleus.uiIcon).size(vars.imageSize).growX();
	  t.label(() => Vars.player.team().cores().size + "").padRight(3).left().get().setFontScale(vars.fontScale);
	  t.image(UnitTypes.mono.uiIcon).size(vars.imageSize).growX();
  	t.label(() => vars.countMiner(Vars.player.team()) + "").padRight(3).left().get().setFontScale(vars.fontScale);

		t.image(UnitTypes.gamma.uiIcon).size(vars.imageSize).growX();
		t.label(() => "[#" + Vars.player.team().color + "]" + vars.countPlayer(Vars.player.team()) + "[white]" + "/"+ "[accent]" + Groups.player.size()).left().get().setFontScale(vars.fontScale);
		t.image(UnitTypes.gamma.uiIcon).size(vars.imageSize).growX();
		t.label(() => Core.settings.getString("uuid", "").substring(0, 3)).left().get().setFontScale(vars.fontScale);
	})).fillX();
	
	table.row();
	table.image().height(3).color(Pal.gray).fillX().update(i => i.setColor(Vars.player.team().color));
	table.row();

  /* units */
	table.pane(Styles.nonePane, t => {
		var runnable = run(() => {
		  t.clear();
		  vars.teams.each(team => {
		    if (Groups.unit.count(u => u.type.isCounted && u.team == team) <= 0) return;
	
		    t.label(() => "[#" + team.color + "]" + team.localized()).padRight(3).minWidth(16).left().get().setFontScale(vars.fontScale + 0.15);
		    
		    Vars.content.units().each(unit => {
		      if (!unit.isCounted || !vars.countUnit(unit, team)) return
		      t.image(unit.uiIcon).size(vars.imageSize);
		      t.label(() => vars.countUnit(unit, team) + "").left().padRight(3).minWidth(16).get().setFontScale(vars.fontScale);
		    });
		      
		    t.row();
		  });
		});
		  
		t.update(() => {
		  if(timer.get(20)) runnable.run();
		})
	});
	
	table.row();
	table.image().height(3).color(Pal.gray).fillX().update(i => i.setColor(Vars.player.team().color));
	table.row();
	
	/* useful buttons */
	table.table(cons(buttons => {
		buttons.button(Icon.hammerSmall, Styles.clearToggleTransi, () => {
			if(Vars.player.isBuilder()){
				Vars.control.input.isBuilding = !Vars.control.input.isBuilding;
			}
		}).height(35).width(360 / 4 + 12).update(b => b.setChecked(!Vars.control.input.isBuilding));
		
		buttons.button(Icon.playersSmall, Styles.clearTransi, () => {
			Call.sendChatMessage("/list");
		}).height(35).width(360 / 4).get();
		
		buttons.button(Icon.play, Styles.clearToggleTransi, () => {
			vars.move = !vars.move;
		}).update(b => {
				b.setChecked(!vars.move);
				b.getStyle().imageUp = vars.move ? Icon.play : Icon.pause;
			}
		).height(35).width(360 / 4).get();
		
		buttons.button(Icon.trashSmall, Styles.clearTransi, () => {
			Vars.ui.showConfirm("您确定要" + "[#" + Color.red + "]" + "投降" + "[#" + Color.white + "]" + "吗?","这可能会为" + "[#" + Vars.player.team().color + "]" +"您的队伍" + "[#" + Color.red + "]" +"造成损失!",run(() => {
				Call.sendChatMessage("/vote gameover");
				Call.sendChatMessage("1");
			}));
		}).height(35).width(360 / 4 - 12).get();
		
		buttons.getCells().each(cell => cell.get().getStyle().up = Styles.none);
	}));
}

module.exports = {
	table: table,
	rebuild: rebuild,
}