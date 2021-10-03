const vars = require("vars");

const minSkip = 0, maxSkip = 20;
var Skip = 0;

var table = new Table();

function rebuild(){
	table.clear();
	
	table.visibility = () => Vars.ui.hudfrag.shown && !Vars.ui.minimapfrag.shown();
	
	table.table(cons(bt => {
		bt.button(Icon.play, 36, () => {
			for(var i = 0; i < Skip; i ++){
				Vars.logic.skipWave();
			}
		}).get();
	
    	bt.label(() => Skip + "波").get().alignment = Align.center;
    	bt.row();
    	bt.slider(minSkip, maxSkip, 1, 1, n => {Skip = n}).growX();
	}));
	
	table.table(cons(t => {
		for(let h = 0;h<6;h++){
			if(h % 3 == 0) t.row();
			let team = Team.baseTeams[h];
			let button = t.button(Tex.whiteui, Styles.clearToggleTransi, 40, run(() => {
				if (Vars.net.client()){
					if(Vars.player.admin){
						Call.sendChatMessage("/team Team." + team.name);
					}
				}else Vars.player.team(team);
    		})).size(50).margin(6).get();
    		
    		button.getImageCell().grow();
            button.getStyle().imageUpColor = team.color;
            button.update(() => button.setChecked(Vars.player.team() == team));
			
		}
	}));
}

module.exports = {
    table: table,
    rebuild: rebuild,
}