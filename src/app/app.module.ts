import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { TableComponent } from './Components/table/table.component';
import { GoogleDirectionsService } from './Services/google-directions.service';
import { FooterComponent } from './Components/footer/footer.component';
import { CapitalizeFirstPipe } from './Pipes/capitalizefirst.pipe';



@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FooterComponent,
    CapitalizeFirstPipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [GoogleDirectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
