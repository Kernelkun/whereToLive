import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ROUTING } from './Routes/app.routes';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TableComponent } from './Components/table/table.component';
import { GoogleDirectionsService } from './Services/google-directions.service';
import { FooterComponent } from './Components/footer/footer.component';
import { CapitalizeFirstPipe } from './Pipes/capitalizefirst.pipe';
import { EditTableComponent } from './Components/edit-table/edit-table.component';



@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FooterComponent,
    CapitalizeFirstPipe,
    EditTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ROUTING,
    FormsModule
  ],
  providers: [GoogleDirectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
