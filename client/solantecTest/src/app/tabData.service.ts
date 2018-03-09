import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TabData{
	public flowList: any = [];
	//private URL = 'http://localhost:8080';
	private URL = 'http://185.224.215.238/solantec/src';
	constructor(public http: HttpClient){}

	getFlowList(){
		this.http.get(this.URL+'/'+'flows/').subscribe((responseData)=>{
			this.flowList = responseData;
		});
	}
}