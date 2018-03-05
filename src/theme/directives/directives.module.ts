import { NgModule } from "@angular/core";
import { AutosizeDirective } from "./autosize/autosize";

const Directives = [AutosizeDirective];

@NgModule({
	declarations: [...Directives],
	imports: [],
	exports: [...Directives]
})
export class DirectivesModule { }
