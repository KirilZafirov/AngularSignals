import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'signals-basic-count',
    standalone: true,
    imports: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
   <div>
     <!-- Signal getter -->
    {{ count() }}
  </div> 
  <div>
          <!-- using the Async pipe  -->
      {{ countSub | async }}
  </div> 
  <div>
      <!-- Accessing the subject value directly  -->
      {{ countSub.value}}
  </div> 
  <div>
      <!-- Using getValue()   -->
      {{ countSub.getValue() }}  
  </div>  
  <div>
        <!-- Using getter()   -->
        {{ prop }}
  </div>
  `,
    styles: [],
})
export class BasicCountComponent {
    count = signal(0);
    countSub = new BehaviorSubject(0);

    prop = `Ordinary string with Signal value: ${this.count()}`

    ngDoCheck() {
        console.log('Change triggered in BasicCountComponent')
    }
}