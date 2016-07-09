import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

// Used accross many services
import { HTTP_PROVIDERS } from '@angular/http';

// Application starting point
import { App } from './app/app';

// Routes configuration
import { APP_ROUTER_PROVIDERS } from './app/routes';

if (process.env.ENV === 'production') {
    enableProdMode();
}

bootstrap(App, [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]).catch(err => console.error(err));
