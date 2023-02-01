
/// <reference lib="webworker" />

// services
import { RightUiLogService } from "src/app/level-wrapper/levels/Services/rightui-log.service";
// interfaces
import { ActiveEnemy } from "src/app/enemy-wrapper/Interfaces/active-enemy";
import { WeaponType } from "src/app/weapon/Interfaces/weapon-type";

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;

  postMessage(response);
});

class DamageWorker {


  constructor(private rightUiLogFeedback: RightUiLogService) {
    
  }

  async calculateDamage(activeEnemy: ActiveEnemy, weapon: WeaponType): Promise<number> {
    const random: number = Math.floor(Math.random());
    const damageArray: number[] = weapon.damage;
    let damage: number = 0;
    if(random >= 5) {
      damage = damageArray[0];
    }
    else {
      damage = damageArray[1];
    }

    
    const enduranceTaken = weapon.armorPenetration + (weapon.firingRate * damage);

    if(enduranceTaken <= activeEnemy.enemyType.armor) {
      this.logFeedback = `${activeEnemy.elementID} takes no damage.`;
      this.appendRightUiLogFeedback();
    }
    else {
      this.enemyStatsService.decreaseEnemyEndurance(activeEnemy, enduranceTaken);
    }
    
    return Promise.resolve(damage)
  }
}

