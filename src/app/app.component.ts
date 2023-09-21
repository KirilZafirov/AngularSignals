import { Component, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DoubleCountComponent } from './double-count.component';
import { DerivedValueComponent } from './derived-value.component';
import { BasicCountComponent } from './basic-count.component';
import { ConditionalDependencyComponent } from './conditional-dependency.component';

@Component({
  selector: 'signals-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AsyncPipe , DoubleCountComponent , DerivedValueComponent , BasicCountComponent , ConditionalDependencyComponent],
  template: `  
  <!-- <signals-basic-count></signals-basic-count>
  <signals-double-count></signals-double-count>
  <signals-derived-value></signals-derived-value> -->
  <signals-conditional-dependency></signals-conditional-dependency>
 
  `,
  styles: [],
})
export class AppComponent {

}
