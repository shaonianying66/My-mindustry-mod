var table = new Table(), schemTable = new Table();
var tags = new Seq(), selectedTags = new Seq();
var schemImageSize = 85, count = 0, shown = false;

function rebuild(){
	table.clear();
	
	checkTags();
	
	if(shown){
		table.add(schemTable).top();
		
		table.pane(Styles.nonePane, tagsTable => {
			tags.each(tag => {
				tagsTable.button(tag, Styles.togglet, () => {
					if(selectedTags.contains(tag)) selectedTags.remove(tag);
					else  selectedTags.add(tag);
					schemRebuild();
				}).checked(selectedTags.contains(tag)).growY().maxWidth(35).maxHeight(35).get().getLabelCell().fontScale(0.95);
			
				tagsTable.row();
			});
		}).top().maxHeight(35 * 6);
	}
	
	table.button("<\n<\n<", () => {
		shown = !shown;
        rebuild();
        schemRebuild();
    }).width(36 * (0.5 + 0.6 * 0.5)).fillY().get();

}

function schemRebuild(){
	schemTable.clear();
	schemTable.label(() => count + "/" + Vars.schematics.all().size);
	schemTable.row();
	
	count = 0;
	schemTable.pane(Styles.nonePane, schem => {
		let i = 0;
		Vars.schematics.all().each(s => {
			if(selectedTags.any() && !s.labels.containsAll(selectedTags)) return;
			count++;
			
			schem.button(cons(b => {
				b.stack(new SchematicsDialog.SchematicImage(s).setScaling(Scaling.fit), new Table(cons(n => {
					n.top();
					n.table(Styles.black3, c => {
						var l = c.add(s.name()).style(Styles.outlineLabel).color(Color.white).top().growX().maxWidth(70 - 8).get();
						l.setEllipsis(true);
						l.setAlignment(Align.center);
					}).growX().margin(1).pad(4).maxWidth(Scl.scl(schemImageSize - 8)).padBottom(0);
				}))).size(schemImageSize);
			}), () => {
				print("use schem: " + s.name());
				Vars.control.input.useSchematic(s);
			});
			
			if(++i % 3 == 0) schem.row();
		});
	}).maxHeight(schemImageSize * 2.5);
}

function checkTags(){
	Vars.schematics.all().each(s => {
		s.labels.each(tag => {
			if(!tags.contains(tag)) tags.add(tag);
		});
	});
}

module.exports = {
    table: table,
    rebuild: rebuild,
}