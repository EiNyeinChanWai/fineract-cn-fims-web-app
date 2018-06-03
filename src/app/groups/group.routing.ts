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
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GroupComponent } from './group.component';
import { GroupFormComponent } from './form/form.component';
import { CreateGroupFormComponent } from './form/create/create.form.component';
import { FimsSharedModule } from '../common/common.module';
import { GroupDetailFormComponent } from './form/detail/detail.component';
import { GroupOfficesComponent } from './form/offices/offices.component';
import { GroupEmployeesComponent } from './form/employees/employees.component';
import { GroupCustomersComponent } from './form/customers/customers.component'
import { EditGroupFormComponent } from './form/edit/edit.form.component';
import { MeetingDateComponent } from './form/meetingDate/meeting-date.component'
import { GroupExistsGuard } from './group-exists.guard';
import { GroupsStore, groupStoreFactory } from './store/index';
import { Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GroupCommandApiEffects } from './store/commands/effects/service.effects';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloseGroupComponent } from './detail/closeGroup/close-group.component';
import { GroupDetailComponent } from './detail/group.detail.component';
import { GroupIndexComponent } from './detail/group.index.component';
import {MeetingDetailComponent} from './detail/meetingDetail/meeting-detail.component';
import {ManageMemberComponent} from './detail/manageMember/manage-member.component';
import {TransferMemberComponent} from './detail/transferMember/transfer-member.component'


export const GroupRoutes: Routes = [
  {
    path: '',
    component: GroupComponent,
    data: { title: 'Manage Groups', },
    //canActivate: [ CatalogExistsGuard ]
  },
  {
    path: 'create',
    component: CreateGroupFormComponent,
    data: { title: 'Create Group', }
  },
  {
    path: 'meetingDate',
    component: MeetingDateComponent,
    data: { title: 'meeting date Group', }
  },
  {
    path: 'close',
    component: CloseGroupComponent,
    data: { title: 'Closing a Group' }
  },
  {
    path: 'meetingDetail',
    component: MeetingDetailComponent,
    data: { title: 'meeting details', }
  },
  {
    path: 'detail/:id/edit',
    component: EditGroupFormComponent,
    data: { title: 'Edit Group', },
    canActivate: [GroupExistsGuard]
  },
  {
    path: 'detail/:id',
    component: GroupIndexComponent,
    data: {},
    canActivate: [GroupExistsGuard],
    children: [
     
     
      {
        path: 'manageMember',
        component: ManageMemberComponent,
        data: { title: 'Manage Members', }
      },
      {
        path: 'transferMember',
        component: TransferMemberComponent,
        data: { title: 'Transfer Members', }
      },

    ]
  }
]