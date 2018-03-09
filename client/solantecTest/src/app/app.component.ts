import { Component } from '@angular/core';

import { TabData } from './tabData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(public tabData: TabData){}

	formatName(name, num){
		return `${name}	(+${num})`; 
	} 

	ngOnInit(){
		this.tabData.getFlowList();
	} 
}
