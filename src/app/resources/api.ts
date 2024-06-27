import { FactoryProvider, InjectionToken, ValueProvider } from "@angular/core";

export const API_URL = new InjectionToken<string>('API_URL')

export const endpoints = {
    product: 'https://dummyjson.com/products'
}

type Endpoint = keyof typeof endpoints;

export function provideApi(api: Endpoint): ValueProvider{
    return {
        provide: API_URL,
        useValue: endpoints[api]
    }
}