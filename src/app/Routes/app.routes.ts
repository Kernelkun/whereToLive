import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from '../Components/table/table.component';
import { EditTableComponent } from '../Components/edit-table/edit-table.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'table', component: TableComponent },
    { path: 'editTable', component: EditTableComponent },

];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
