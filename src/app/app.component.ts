import { Component } from '@angular/core';
import { HomeProductComponent } from '@drivers/components/products/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeProductComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'hexagonal-arch';
}
