import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(msg: any){
    console.error("Error:", msg);
    // api call to log errors in kibana or any vizualization tool
  }
}
