var showUnits = true, showItems = true;
var oShown = false;
var teams = new Seq(), otherItemUsed = new Seq();
var fontScale = 0.75, imageSize = Vars.iconSmall * fontScale;

var move = true;

Events.run(Trigger.update, e => {
	teams.clear();
	
	Vars.state.teams.getActive().each(data =>{
		if(data.hasCore()) teams.add(data.team);
		
		data.team.items().each(item => {
			if(!otherItemUsed.contains(item)) otherItemUsed.add(item);
		});
	});
   // print(move);
	teams.sort(Floatf(team => {
		let items = 0;
		team.items().each((item, amount) => items -= amount);
		return items;
	}));
	
	//put the uiscale to 60% 
	Scl.setProduct(60 / 100);
});

Events.run(WorldLoadEvent, () => {
	otherItemUsed.clear();
});

function countUnit(unitType, team){
	return team.data().countType(unitType);
}

function countPlayer(team){
	return Groups.player.count(player => player.team() == team);
}

function countMiner(team){
    return team.data().units.count(u => u.controller instanceof MinerAI);
}


module.exports = {
	showUnits: showUnits,
	showItems: showItems,
	oShown: oShown,
	teams: teams,
	otherItemUsed: otherItemUsed,
	fontScale: fontScale,
	imageSize: imageSize,
	countUnit: countUnit,
	countPlayer: countPlayer,
	countMiner: countMiner,
	move: move,
}