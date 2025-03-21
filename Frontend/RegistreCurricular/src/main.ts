import { AppComponent } from './components/app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { authInterceptor } from './interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient()
  ],
}).catch((err) => console.error(err));
