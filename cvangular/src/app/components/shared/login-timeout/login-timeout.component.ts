import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-submit-timeout',
  templateUrl: './login-timeout.component.html',
  styleUrls: ['./login-timeout.component.scss']
})
export class LoginTimeoutComponent implements OnInit, OnDestroy {

  @Input() timeoutMinutes: number = 1; // Tiempo en minutos para bloqueo
  remainingTime: number = 0;
  private countdownSubscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  startCountdown(): void {
    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + this.timeoutMinutes);

    this.countdownSubscription = timer(0, 1000).subscribe(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      this.remainingTime = Math.max(0, Math.floor(diff / 1000));

      if (this.remainingTime === 0) {
        this.countdownSubscription.unsubscribe();
      }
    });
  }
}
