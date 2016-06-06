import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

// Used accross many services
import { HTTP_PROVIDERS } from '@angular/http';

// Application starting point
import { App } from './app/app';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(App, [
  HTTP_PROVIDERS
]);
