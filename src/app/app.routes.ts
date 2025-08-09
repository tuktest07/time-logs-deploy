import { Routes } from '@angular/router';
import { BradenFormComponent } from './braden-form/braden-form.component';
import { AdlDailyComponent } from './adl-daily/adl-daily.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { CompanyInfoComponent } from './company-info/company-info.component';

export const routes: Routes = [
    // {
    //     path: '', component: BradenFormComponent
    // }
    {
        path: '', component: AdlDailyComponent
    }
    // {
    //     path: '', component: LeaveRequestComponent
    // }
    // {
    //     path: '', component: CompanyInfoComponent
    // }
];
