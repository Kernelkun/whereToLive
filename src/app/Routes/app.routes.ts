import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from '../Components/table/table.component';
import { EditTableComponent } from '../Components/edit-table/edit-table.component';
import { HomeComponent } from '../Components/home/home.component';
import { ErrorComponent } from '../Components/error/error.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'table', component: TableComponent },
    { path: 'editTable', component: EditTableComponent },
    { path: '**', component: ErrorComponent }

];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
