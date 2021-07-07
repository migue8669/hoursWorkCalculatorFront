import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  private message = new BehaviorSubject<number>(0);

  public customMessage = this.message.asObservable();

  constructor() {}

  public changeMessage(msg: number): void {
    console.log(msg)
    this.message.next(msg);
  }

}
