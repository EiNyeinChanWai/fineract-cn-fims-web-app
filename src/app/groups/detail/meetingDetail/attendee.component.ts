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
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../store';
import {SEARCH} from '../../../store/customer/customer.actions';


@Component({
    selector: 'fims-meeting-attendee-form',
    templateUrl: './attendee.component.html'
  })
  export class MeetingAttendeeComponent implements OnInit {
  
  meetingData$: Observable<TableData>;
  customers: Observable<Customer[]>;
  status: Observable< Status[]>;

  columns: any[] = [
    {name:'customer.givenName',label:'Attendees'},
    {name:'attendee.status',label:'Status'}
  ]
  
  @Input() preSelection: string;

  @Output() onSelectionChange = new EventEmitter<string[]>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.customers = this.store.select(fromRoot.getCustomerSearchResults)
      .map(customerPage => customerPage.customers);
  }

  search(searchTerm) {
    const fetchRequest: FetchRequest = {
      searchTerm
    };

    this.store.dispatch({ type: SEARCH, payload: fetchRequest });
  }

  select(selections: string[]): void {
    this.onSelectionChange.emit(selections);
  }
  
}