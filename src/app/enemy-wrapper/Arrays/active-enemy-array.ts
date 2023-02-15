// rxjs
import { Subject } from "rxjs";
// interfaces 
import { ActiveEnemy } from "../Interfaces/active-enemy";

export const activeEnemyArray: ActiveEnemy[] = [];
export const activeEnemyArraySubject: Subject<ActiveEnemy>[] = [];