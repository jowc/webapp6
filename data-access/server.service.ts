import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScoreServer {
  scoreServer: string = 'https://assessments.reliscore.com/api/cric-scores/';
  http = inject(HttpClient);

  getScores = () => this.http.get(this.scoreServer);
}
