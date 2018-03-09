import { Component, Input } from '@angular/core';
import { TabContentData } from './tabContentData.service';

@Component({
  selector: 'tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent {

  @Input()
  private URL: string = '';

  @Input()
  private flowName: string = '';

  //here we need to store one flow for every tab. Usually I would
  //do smth like array of flows in separate data.service, but 
  //since it is not critical now, i'll just store it in component
  public flow: any = [];

  constructor(public tabContentData: TabContentData) { }

  ngOnInit(){
  	this.tabContentData.getFlow(this.URL, this.flowName, this.flow);
  }

}
