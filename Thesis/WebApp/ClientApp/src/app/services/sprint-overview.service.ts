import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { SprintOverview } from '../models/sprintoverview.model';

@Injectable({ providedIn: 'root' })

export class SprintOverviewService {

    constructor(private restService: RestService) {
    }

    public getSprintData(): Observable<SprintOverview[]> {
        return this.restService.httpGet<any[]>(`api/Sprint/Get`);
    }
}
