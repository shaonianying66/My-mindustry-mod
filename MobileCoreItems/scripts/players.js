var table = new Table(), content = new Table();
var timer = new Interval();
var players = new Seq();
var targetPlayer = null;
var u = 5;

Events.run(Trigger.update, e => {
	if(targetPlayer != null){
		var target = targetPlayer;
		if(targetPlayer.unit() instanceof BlockUnitc && targetPlayer.unit().tile().block instanceof Turret) target = targetPlayer.unit().tile().targetPos
		Core.camera.position.set(target);
	}
});

function build(){
	table.clear();
	table.pane(content).maxHeight(235);
	table.update(() => {
		if(timer.get(20)){
			rebuild();
		}
	});
}
	
function rebuild(){
	content.clear();
	
	players.clear();
	Groups.player.copy(players);
	players.sort(Structs.comps(Structs.comparing(p => p.team()), Structs.comparingBool(p => !p.admin)));

	content.table(Styles.black3, t => {
		/* players */
		t.label(() => "[#" + Vars.player.team().color + "]" + Groups.player.count(p => p.team() == Vars.player.team()) + "[] / " + Groups.player.size());
		t.row();
		
		players.each(player => {
			t.table(cons(info => {
				info.table(cons(image => {
					image.add(new Image(player.icon()).setScaling(Scaling.bounded)).grow();
				})).size(35);
				
				info.labelWrap("[#" + player.color.toString().toUpperCase() + "]" + player.name).width(140).pad(10);
				info.add().grow();
				
				info.button(Icon.lock, Styles.clearToggleTransi, () => {
					if(targetPlayer != player) targetPlayer = player
					else targetPlayer = null;
				}).size(35).update(b => {
					b.setChecked(targetPlayer == player);
					b.getStyle().imageUp = b.isChecked() ? Icon.lock : Icon.lockOpen;
					b.getStyle().up = Styles.none;
				});
				
				info.button(Icon.units, Styles.clearPartiali, () => {
					Core.camera.position.set(player);
				}).size(35);
				
				info.button(Icon.hammer, Styles.clearPartiali, () => {
					Vars.ui.showConfirm("@confirm", Core.bundle.format("confirmvotekick", player.name), () => {
					Call.sendChatMessage("/votekick " + player.name);
					});
				}).size(35);
				
			}));
			
			t.row();
			t.image().height(4).color(player.team().color).fillX();
			t.row();
		});
	});
}


module.exports = {
	table: table,
	build: build,
}