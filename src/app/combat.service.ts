import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CombatService {

  constructor() { }
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./combat.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}