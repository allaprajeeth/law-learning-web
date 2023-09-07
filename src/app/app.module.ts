import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenComponent } from './common/components/splash-screen/splash-screen.component';
import { HeaderComponent } from './common/components/header/header.component';
import { SharedModule } from './shared-module/shared.module';
import { DashboardComponent } from './common/components/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './common/services/http-interceptor/http-interceptor.service';
import { ErrorHandlerService } from './common/services/error-handler/error-handler.service';
import { LoadingComponent } from './common/components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    HeaderComponent,
    DashboardComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
