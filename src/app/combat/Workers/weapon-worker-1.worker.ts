/// <reference lib="webworker" />

// types

type vector =  "ground" | "air" | "submarine";

// interfaces

interface WeaponType {
  weaponName: string,
  caliber: string,
  firingRate: number,
  reloadingRate: number,
  muzzleVelo: number,
  ammoCapacity: number,
  range: {ground: number, air: number, submarine: number},
  barrelLife: number,
  attackVector: vector[],
  damage: number[],
  armorPenetration: number,
  train: number | null,
}

interface ActiveEnemy {
  elementID: string, 
  enemyType: Enemy, 
  x: number, 
  y: number,
  endurance: number,
  distance: number,
};

interface Enemy {
  enemyName: string,
  length: number,
  height: number,
  backgroundImagePath: string | null,
  description: string,
  enemyClass: vector,
  endurance: number,
  armor: number,
  maxSpeed: number,
  enemyWeapons: {
      weapon: EnemyWeapon,
      quantity: number
  } | null
  enemySkills: EnemySkills | null,
  attacksWarship: boolean, 
  cssStyles: string,
  cssMainStyleName: string,
}

interface EnemyWeapon {
  weaponName: string,
  firingRate: number,
  reloadingRate: number | null,
  muzzleVelo: number | null,
  ammoCapacity: number,
  range: number[],
  attackVector: vector[],
  damage: number[],
  armorPenetration: number,
  train: number | null,
}

interface EnemySkills {
}

interface WarshipCombatData {
  activeEnemy: ActiveEnemy, 
  weapon: WeaponType, 
  weaponQuantity: number,
}

// class
class WeaponWorker {
  resolutionMessage = "resolved";
  busy: boolean = false;
  weapon: WeaponType | null = null;
  enemy: Enemy | null = null;
  activeEnemyArray: ActiveEnemy[] = [];
  activeEnemy: ActiveEnemy | null = null;
  damagingInterval = setInterval(() => {});
  constructor() {
    addEventListener('message', async ({ data }) => {
      switch(data) {
        case typeof(x as WeaponType): 
          this.weapon = data;
        break;
    
        case typeof(x as Enemy):
          this.enemy = data;
        break;
    
        case typeof(x as ActiveEnemy[]):
          this.activeEnemyArray = data;
          await this.checkIfCombatCanBeInitiated();
        break;

        case typeof(x as WeaponType):
          this.weapon = data;
        break;
      }
    });
    this.setContactInterval();
  }

  async communicateYourStatus(): Promise<boolean> {
    let checker = true;

    if(this.busy == false) {
      postMessage("free");
    }

    return Promise.resolve(checker);
  }

  async setContactInterval() {
    const worker1Interval = setInterval(() => {
      this.communicateYourStatus();
    }, 1000);
    worker1Interval;

    return Promise.resolve(this.resolutionMessage);
  }

  async checkIfCombatCanBeInitiated() {
    for(let enemy of this.activeEnemyArray) {
      let hasVector = await this.doWeaponHasVectorWorker(enemy);
      if(hasVector == true) {
        let isInRange = await this.isEnemyInRangeWorker(enemy);
        if(isInRange == true) {
          await this.startCombat(enemy);
        }
      }
    }

    return Promise.resolve(this.resolutionMessage);
  }

  async isEnemyInRangeWorker(activeEnemy: ActiveEnemy): Promise<boolean> {
    let checker: boolean = false;
    const weapon = this.weapon!;
    
    switch(activeEnemy.enemyType.enemyClass) {
      case "air":

        if(weapon.range.air <= activeEnemy.distance) {
          return true;
        } 
      break;
      
      case "ground":
        if(weapon.range.ground <= activeEnemy.distance) {
          return true;
        } 
      break;

      case "submarine":
        if(weapon.range.submarine <= activeEnemy.distance) {
          return true;
        } 
      break;
    }
    return Promise.resolve(checker);
  }

  async doWeaponHasVectorWorker(activeEnemy: ActiveEnemy): Promise<boolean> {
    const containsVector: boolean = this.weapon!.attackVector.includes(activeEnemy.enemyType.enemyClass);

    return Promise.resolve(containsVector);
  }

  async calculateDamage(): Promise<number> {
    const weapon = this.weapon!;
    const random: number = Math.floor(Math.random());
    const damageArray: number[] = weapon.damage;
    let damage: number = 0;
    if(random >= 5) {
      damage = damageArray[0];
    }
    else {
      damage = damageArray[1];
    }
    return Promise.resolve(damage)
  }

  async calculateEnduranceTaken(damage: number): Promise<number> {
    const weapon = this.weapon!;
    const enduranceTaken = weapon.armorPenetration + (weapon.firingRate * damage);
    return Promise.resolve(enduranceTaken);
  }

  async startCombat(enemy: ActiveEnemy): Promise<string> {
    this.busy = true;
    postMessage({enemy: enemy, weapon: this.weapon});
    
    while(enemy.endurance <= 0)
    {
      let damage = await this.calculateDamage();
      let enduranceTaken = await this.calculateEnduranceTaken(damage);
      if(enduranceTaken <= this.activeEnemy!.enemyType.armor) {
        postMessage({logFeedback: true, message: `${enemy.elementID} takes no damage.`});
      }
      else {
        postMessage({activeEnemy: enemy, enduranceTaken: enduranceTaken});
      } 
    }

    return Promise.resolve("resolved");
  }
}

let x: any;
// addEventListener('message', ({ data }) => {
//   switch(data) {
//     case typeof(weapon): 
//       weapon = data;
//     break;

//     case typeof(enemy):
//       enemy = data;
//     break;

//     case typeof(activeEnemyArray): {
//       activeEnemyArray = data;
      
//     }
//   }
//   if(data == typeof(weapon)) {
//     weapon = data;
//   }
//   const response = `worker response to ${data}`;
//   postMessage(response);
// });
