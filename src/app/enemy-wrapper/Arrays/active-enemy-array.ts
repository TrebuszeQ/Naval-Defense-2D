// rxjs
import { Subject } from "rxjs";
// interfaces 
import { ActiveEnemy } from "../Interfaces/active-enemy";

export let activeEnemyArray: ActiveEnemy[] = [];
export let activeEnemyArraySubject: Subject<ActiveEnemy>[] = [];
export let activeEnemyArraySubjectAll: Subject<ActiveEnemy[]> = new Subject<ActiveEnemy[]>();