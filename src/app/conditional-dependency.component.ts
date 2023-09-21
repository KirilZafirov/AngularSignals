import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'signals-conditional-dependency',
    standalone: true,
    imports: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
       <button type="button" (click)="toggleCount()">Show Count</button>
       <button type="button" (click)="changeCount()">Change Count</button>
   <div>
     <!-- Signal getter -->
    {{ conditionalCount() }}
  </div> 

  <div>
     <!-- Signal getter -->
    {{ count() }}
  </div> 
 
  `,
    styles: [],
})
export class ConditionalDependencyComponent {
    showCount = signal(false);
    count = signal(1);
    conditionalCount = computed(() => {
        console.log('computations in conditionalCount')
        if (this.showCount()) {
            return `The count is ${this.count()}.`;
        } else {
            return 'Nothing to see here!';
        }
    });

    toggleCount() {
        this.showCount.update(value => !value)
    }

    changeCount() {
        this.count.update(value => value + 1)
    }
}