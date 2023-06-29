import { Subscription } from 'rxjs';

export class SubscriptionHandler {
  subscriptions: Subscription[] = [];

  set add(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  removeAll = () => this.subscriptions.forEach((sub) => sub.unsubscribe());
}
