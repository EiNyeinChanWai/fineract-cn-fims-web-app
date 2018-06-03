/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {Component, Input,Output,OnInit,EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormComponent} from '../../../common/forms/form.component';
import {FormBuilder, Validators,FormGroup} from '@angular/forms';
import {FimsValidators} from '../../../common/validator/validators';
import { Attendee,Status} from '../../../services/group/domain/attendee.model';
import {Customer} from '../../../services/customer/domain/customer.model';
import {Observable} from 'rxjs/Observable';
import {Meeting} from '../../../services/group/domain/meeting.model'
import * as fromGroups from '../../store';
import {Subscription} from 'rxjs/Subscription';
import {GroupsStore} from '../../store/index';
import {CREATE, RESET_FORM} from '../../store/group.actions';
import {Error} from '../../../services/domain/error.model';
import {FetchRequest} from '../../../services/domain/paging/fetch-request.model';
import {TableData, TableFetchRequest} from '../../../common/data-table/data-table.component';



@Component({
    templateUrl:'./meeting-detail.component.html'
})

export class MeetingDetailComponent implements OnInit{
  form:FormGroup
  
  meetingData$: Observable<TableData>;
  customers: Observable<Customer[]>;
  status: Observable< Status[]>;

  columns: any[] = [
    {name:'customer.givenName',label:'Attendees'},
    {name:'attendee.status',label:'Status'}
  ]

  private formStateSubscription: Subscription;

   meeting : Meeting={
    meetingSequence : 1,
    groupIdentifier : '',
    currentCycle : 2,
    attendees : [],
    scheduledFor :'',
    location : '',
    heldOn : '',
    duration : 40,
    createdOn : '',
    createdBy: ''
   }
    
   constructor(private router: Router, private route: ActivatedRoute, private store: GroupsStore) {
    ;
  }


ngOnInit(){

}

  ngOnDestroy(): void {
    this.formStateSubscription.unsubscribe();

    this.store.dispatch({ type: RESET_FORM });
  }

  onSave(meeting: Meeting) {
    this.store.dispatch({ type: CREATE, payload: {
      meeting,
      activatedRoute: this.route
    } });
  }

  onCancel() {
    this.navigateAway();
  }

  navigateAway(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}