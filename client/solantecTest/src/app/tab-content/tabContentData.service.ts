import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TabContentData{
	constructor(public http: HttpClient){}

	getFlow(URL, flowName, flow){
		flowName = this.convertFlowName(flowName); 
		this.http.get(URL+'/'+'?'+flowName).subscribe((responseData: any[])=>{
			responseData.forEach((post)=>{
				flow.push(post);
			})
		});
	}

	convertFlowName(flowName){
		switch(flowName){
			case 'Разработка': return 'develop';
			case 'Администрирование': return 'admin';
			case 'Дизайн': return 'design';
			case 'Управление': return 'management';
			case 'Маркетинг': return 'marketing';
			case 'Разное': return 'misc';
		}
	}
}