import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { HotToastModule } from '@ngneat/hot-toast';
import { GridModule } from '@modules/grid/grid.module';
import { HomeModule } from '@modules/home/home.module';

const config: SocketIoConfig = { url: environment.urlServer, options: { reconnection: true,  transports: ['websocket'] } };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    GridModule,
    HomeModule,
    SocketIoModule.forRoot(config),
    HotToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
